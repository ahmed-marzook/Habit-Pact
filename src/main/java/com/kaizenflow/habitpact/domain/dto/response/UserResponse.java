package com.kaizenflow.habitpact.domain.dto.response;

import java.time.LocalDateTime;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(name = "UserResponse", description = "Response object containing user information")
public record UserResponse(
        @Schema(
                        description = "Unique identifier of the user",
                        example = "550e8400-e29b-41d4-a716-446655440000")
                String id,
        @Schema(description = "User's email address", example = "john.doe@example.com") String email,
        @Schema(description = "User's unique username", example = "johndoe") String username,
        @Schema(description = "User's first name", example = "John") String firstName,
        @Schema(description = "User's last name", example = "Doe") String lastName,
        @Schema(description = "Indicates if the user account is active", example = "true")
                boolean active,
        @Schema(
                        description = "Timestamp when the user account was created",
                        example = "2024-12-06T10:30:00",
                        format = "date-time")
                LocalDateTime createdAt,
        @Schema(
                        description = "Timestamp when the user account was last updated",
                        example = "2024-12-06T15:45:00",
                        format = "date-time")
                LocalDateTime updatedAt) {}
