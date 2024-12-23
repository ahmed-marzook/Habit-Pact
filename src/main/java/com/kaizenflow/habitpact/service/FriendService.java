package com.kaizenflow.habitpact.service;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kaizenflow.habitpact.domain.dto.response.FriendRequestResponse;
import com.kaizenflow.habitpact.domain.enums.RequestStatus;
import com.kaizenflow.habitpact.domain.model.FriendRequest;
import com.kaizenflow.habitpact.domain.model.User;
import com.kaizenflow.habitpact.exception.InvalidOperationException;
import com.kaizenflow.habitpact.exception.ResourceNotFoundException;
import com.kaizenflow.habitpact.mappers.FriendRequestMapper;
import com.kaizenflow.habitpact.repository.FriendRequestRepository;
import com.kaizenflow.habitpact.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FriendService {

    private final UserRepository userRepository;
    private final FriendRequestRepository friendRequestRepository;
    private final FriendRequestMapper friendRequestMapper;

    @Transactional
    public FriendRequestResponse sendFriendRequest(String senderId, String receiverEmail) {
        User senderUser = findUserById(senderId);
        User receiverUser = findUserByEmail(receiverEmail);

        validateFriendRequest(senderUser, receiverUser);

        Optional<FriendRequest> existingRequest =
                friendRequestRepository.findBySenderIdAndReceiverId(
                        senderUser.getId(), receiverUser.getId());

        if (existingRequest.isPresent()) {
            return friendRequestMapper.friendRequestToFriendRequestResponse(existingRequest.get());
        }

        Optional<FriendRequest> receiverExistingRequest =
                friendRequestRepository.findBySenderIdAndReceiverId(
                        receiverUser.getId(), senderUser.getId());

        if (receiverExistingRequest.isPresent()) {
            return respondToRequest(receiverExistingRequest.get().getId(), RequestStatus.ACCEPTED);
        }

        FriendRequest newFriendRequest =
                friendRequestRepository.save(
                        FriendRequest.builder()
                                .senderId(senderUser.getId())
                                .receiverId(receiverUser.getId())
                                .receiverEmail(receiverEmail)
                                .build());

        senderUser.getFriendRequestsSent().add(newFriendRequest.getId());
        receiverUser.getFriendRequestsReceived().add(newFriendRequest.getId());

        userRepository.save(senderUser);
        userRepository.save(receiverUser);

        return friendRequestMapper.friendRequestToFriendRequestResponse(newFriendRequest);
    }

    @Transactional
    public FriendRequestResponse respondToRequest(String requestId, RequestStatus status) {
        FriendRequest request =
                friendRequestRepository
                        .findById(requestId)
                        .orElseThrow(() -> new ResourceNotFoundException("Friend Request", "id", requestId));

        request.setStatus(status);

        if (status.isAccepted()) {
            addFriendship(request.getSenderId(), request.getReceiverId());
        }

        removeFriendRequestFromUsers(request);

        return friendRequestMapper.friendRequestToFriendRequestResponse(
                friendRequestRepository.save(request));
    }

    private void removeFriendRequestFromUsers(FriendRequest request) {
        User sender = findUserById(request.getSenderId());
        User receiver = findUserById(request.getReceiverId());

        sender.getFriendRequestsSent().remove(request.getId());
        receiver.getFriendRequestsReceived().remove(request.getId());

        userRepository.save(sender);
        userRepository.save(receiver);
    }

    private void addFriendship(String user1Id, String user2Id) {
        User user1 = userRepository.findById(user1Id).orElseThrow();
        User user2 = userRepository.findById(user2Id).orElseThrow();

        user1.getFriendIds().add(user2Id);
        user2.getFriendIds().add(user1Id);

        userRepository.save(user1);
        userRepository.save(user2);
    }

    private void validateFriendRequest(User sender, User receiver) {
        if (sender.getId().equals(receiver.getId())) {
            throw new InvalidOperationException("Cannot send friend request to yourself");
        }

        if (sender.getFriendIds().contains(receiver.getId())) {
            throw new InvalidOperationException("Users are already friends");
        }
    }

    private User findUserById(String userId) {
        return userRepository
                .findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
    }

    private User findUserByEmail(String email) {
        return userRepository
                .findByEmailAndActive(email, true)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
    }
}
