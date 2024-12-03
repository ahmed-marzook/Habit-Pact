package com.kaizenflow.habitpact.domain.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users")
public class User {

    @Id private String id;

    @Indexed(unique = true)
    private String email;

    private String password; // Will be hashed

    private String firstName;
    private String lastName;

    @Indexed(unique = true)
    private String username;

    @Builder.Default private boolean active = true;

    @CreatedDate private LocalDateTime createdAt;

    @LastModifiedDate private LocalDateTime updatedAt;
}
