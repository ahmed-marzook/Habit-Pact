package com.kaizenflow.habitpact.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kaizenflow.habitpact.domain.dto.response.FriendRequestResponse;
import com.kaizenflow.habitpact.domain.enums.RequestStatus;
import com.kaizenflow.habitpact.domain.model.FriendRequest;
import com.kaizenflow.habitpact.domain.model.User;
import com.kaizenflow.habitpact.exception.ResourceAlreadyExistsException;
import com.kaizenflow.habitpact.exception.ResourceNotFoundException;
import com.kaizenflow.habitpact.mappers.FriendRequestMapper;
import com.kaizenflow.habitpact.repository.FriendRequestRepository;
import com.kaizenflow.habitpact.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class FriendService {

    private final UserRepository userRepository;
    private final FriendRequestRepository friendRequestRepository;
    private final FriendRequestMapper friendRequestMapper;

    public FriendRequestResponse sendFriendRequest(String senderId, String receiverEmail) {
        User senderUser =
                userRepository
                        .findById(senderId)
                        .orElseThrow(() -> new ResourceNotFoundException("User", "id", senderId));
        User receiverUser =
                userRepository
                        .findByEmailAndActive(receiverEmail, true)
                        .orElseThrow(() -> new ResourceNotFoundException("User", "email", receiverEmail));

        friendRequestRepository
                .findBySenderIdAndReceiverId(senderUser.getId(), receiverUser.getId())
                .ifPresent(
                        existing -> {
                            throw new ResourceAlreadyExistsException("Friend Request", "email", receiverEmail);
                        });

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

    public FriendRequestResponse respondToRequest(String requestId, RequestStatus status) {
        FriendRequest request =
                friendRequestRepository
                        .findById(requestId)
                        .orElseThrow(() -> new ResourceNotFoundException("Friend Request", "id", requestId));

        request.setStatus(status);

        if (status == RequestStatus.ACCEPTED) {
            addFriendship(request.getSenderId(), request.getReceiverId());
        }

        // Remove request IDs from users' lists
        User sender =
                userRepository
                        .findById(request.getSenderId())
                        .orElseThrow(() -> new ResourceNotFoundException("User", "id", request.getSenderId()));
        User receiver =
                userRepository
                        .findById(request.getReceiverId())
                        .orElseThrow(
                                () -> new ResourceNotFoundException("User", "id", request.getReceiverId()));
        sender.getFriendRequestsSent().remove(requestId);
        receiver.getFriendRequestsReceived().remove(requestId);

        userRepository.save(sender);
        userRepository.save(receiver);

        return friendRequestMapper.friendRequestToFriendRequestResponse(
                friendRequestRepository.save(request));
    }

    private void addFriendship(String user1Id, String user2Id) {
        User user1 = userRepository.findById(user1Id).orElseThrow();
        User user2 = userRepository.findById(user2Id).orElseThrow();

        user1.getFriendIds().add(user2Id);
        user2.getFriendIds().add(user1Id);

        userRepository.save(user1);
        userRepository.save(user2);
    }
}
