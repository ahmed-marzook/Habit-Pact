package com.kaizenflow.habitpact.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.kaizenflow.habitpact.domain.dto.response.FriendRequestResponse;
import com.kaizenflow.habitpact.domain.enums.RequestStatus;
import com.kaizenflow.habitpact.domain.model.FriendRequest;

public interface FriendRequestRepository extends MongoRepository<FriendRequest, String> {
    Optional<FriendRequest> findBySenderIdAndReceiverIdAndStatus(
            String senderId, String receiverId, RequestStatus status);

    List<FriendRequestResponse> findByReceiverIdAndStatus(String receiverId, RequestStatus status);
}
