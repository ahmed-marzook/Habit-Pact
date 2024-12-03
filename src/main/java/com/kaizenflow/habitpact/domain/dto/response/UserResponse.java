package com.kaizenflow.habitpact.domain.dto.response;

import java.time.LocalDateTime;

public record UserResponse(
        String id,
        String email,
        String username,
        String firstName,
        String lastName,
        boolean active,
        LocalDateTime createdAt,
        LocalDateTime updatedAt) {}
