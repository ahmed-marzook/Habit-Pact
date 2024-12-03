package com.kaizenflow.habitpact.domain.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateUserRequest(
        @NotBlank(message = "Email is required") @Email(message = "Invalid email format") String email,
        @NotBlank(message = "Password is required")
                @Size(min = 8, message = "Password must be at least 8 characters long")
                String password,
        @NotBlank(message = "Username is required")
                @Size(min = 3, message = "Username must be at least 3 characters long")
                String username,
        @NotBlank(message = "First name is required") String firstName,
        @NotBlank(message = "Last name is required") String lastName) {}
