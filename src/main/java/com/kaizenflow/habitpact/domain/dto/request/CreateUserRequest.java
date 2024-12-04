package com.kaizenflow.habitpact.domain.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Schema(description = "Request object for creating a new user")
public record CreateUserRequest(
        @Schema(description = "User's email address", example = "john.doe@example.com")
                @NotBlank(message = "Email is required")
                @Email(message = "Invalid email format")
                String email,
        @Schema(description = "User's password", example = "password123", minLength = 8)
                @NotBlank(message = "Password is required")
                @Size(min = 8, message = "Password must be at least 8 characters long")
                String password,
        @Schema(description = "User's unique username", example = "johndoe")
                @NotBlank(message = "Username is required")
                @Size(min = 3, message = "Username must be at least 3 characters long")
                String username,
        @Schema(description = "User's first name", example = "John")
                @NotBlank(message = "First name is required")
                String firstName,
        @Schema(description = "User's last name", example = "Doe")
                @NotBlank(message = "Last name is required")
                String lastName) {}
