package com.kaizenflow.habitpact.domain.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

@Schema(
        name = "UpdateUserRequest",
        description = "Request object for updating an existing user's information")
public record UpdateUserRequest(
        @Schema(
                        description = "User's email address",
                        example = "john.doe@example.com",
                        pattern = "^[A-Za-z0-9+_.-]+@(.+)$",
                        maxLength = 255)
                @Email(message = "Invalid email format")
                String email,
        @Schema(
                        description = "User's unique username",
                        example = "johndoe",
                        minLength = 3,
                        maxLength = 50)
                @Size(min = 3, message = "Username must be at least 3 characters long")
                String username,
        @Schema(description = "User's first name", example = "John", maxLength = 50) String firstName,
        @Schema(description = "User's last name", example = "Doe", maxLength = 50) String lastName) {}
