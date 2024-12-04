package com.kaizenflow.habitpact.domain.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Schema(
        name = "Authentication Request",
        description = "Contains user credentials for authentication")
public record AuthRequest(
        @Schema(
                        description = "User's email address used for authentication",
                        example = "john.doe@example.com",
                        requiredMode = Schema.RequiredMode.REQUIRED)
                @NotBlank(message = "Email is required")
                @Email(message = "Must be a valid email address")
                String email,
        @Schema(
                        description = "User's password for authentication",
                        example = "password123",
                        requiredMode = Schema.RequiredMode.REQUIRED,
                        minLength = 8,
                        maxLength = 50)
                @NotBlank(message = "Password is required")
                @Size(min = 8, max = 50, message = "Password must be between 8 and 50 characters")
                String password) {}
