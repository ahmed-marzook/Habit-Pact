package com.kaizenflow.habitpact.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kaizenflow.habitpact.domain.dto.response.FriendRequestResponse;
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
                .orElseThrow(
                        () -> new ResourceAlreadyExistsException("Friend Request", "email", receiverEmail));

        FriendRequest newFriendRequest =
                FriendRequest.builder()
                        .senderId(senderUser.getId())
                        .receiverId(receiverUser.getId())
                        .build();

        return friendRequestMapper.friendRequestToFriendRequestResponse(
                friendRequestRepository.save(newFriendRequest));
    }
}
