package com.kaizenflow.habitpact.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.kaizenflow.habitpact.domain.enums.RequestStatus;
import com.kaizenflow.habitpact.domain.model.FriendRequest;

public interface FriendRequestRepository extends MongoRepository<FriendRequest, String> {
    Optional<FriendRequest> findBySenderIdAndReceiverId(String senderId, String receiverId);

    List<FriendRequest> findByReceiverIdAndStatus(String receiverId, RequestStatus status);
}
