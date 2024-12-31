package com.kaizenflow.habitpact.domain.dto.response;

import java.time.LocalDateTime;

import com.kaizenflow.habitpact.domain.enums.RequestStatus;

public record FriendRequestResponse(
        String id,
        String senderId,
        String receiverEmail,
        String senderEmail,
        RequestStatus status,
        LocalDateTime createdAt,
        LocalDateTime updatedAt) {}
