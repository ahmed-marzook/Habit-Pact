package com.kaizenflow.habitpact.domain.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Schema(description = "Request payload for changing user password")
public record ChangePasswordRequest(
        @Schema(description = "Current password", example = "password123", minLength = 8)
                @NotBlank(message = "Current password is required")
                @Size(min = 8, message = "Current password must be at least 8 characters long")
                String currentPassword,
        @Schema(description = "New password", example = "newPass123", minLength = 8)
                @NotBlank(message = "New password is required")
                @Size(min = 8, message = "New password must be at least 8 characters long")
                String newPassword) {}
