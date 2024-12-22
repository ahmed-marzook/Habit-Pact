package com.kaizenflow.habitpact.domain.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.annotation.Version;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import com.kaizenflow.habitpact.domain.enums.RequestStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "friend_requests")
public class FriendRequest {

    @Id private String id;

    @Indexed private String senderId;

    @Indexed private String receiverId;

    private String receiverEmail;

    @Builder.Default private RequestStatus status = RequestStatus.PENDING;

    @CreatedDate private LocalDateTime createdAt;

    @LastModifiedDate private LocalDateTime updatedAt;

    @Version private Integer version;
}
