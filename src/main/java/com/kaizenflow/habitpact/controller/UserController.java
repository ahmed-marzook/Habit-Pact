package com.kaizenflow.habitpact.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kaizenflow.habitpact.config.security.UserInfoDetails;
import com.kaizenflow.habitpact.domain.dto.request.CreateUserRequest;
import com.kaizenflow.habitpact.domain.dto.request.UpdateUserRequest;
import com.kaizenflow.habitpact.domain.dto.response.UserResponse;
import com.kaizenflow.habitpact.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@Tag(name = "Users", description = "User management APIs")
public class UserController {
    private final UserService userService;

    @Operation(
            summary = "Update a user",
            description = "Fully updates a user's information. All fields must be provided.")
    @PutMapping()
    public ResponseEntity<UserResponse> updateUser(
            @AuthenticationPrincipal UserInfoDetails userInfoDetails,
            @Valid @RequestBody CreateUserRequest request) {
        return ResponseEntity.ok(userService.updateUser(userInfoDetails.getUserId(), request));
    }

    @Operation(
            summary = "Partially update a user",
            description = "Updates only the provided fields of a user's information")
    @PatchMapping()
    public ResponseEntity<UserResponse> patchUser(
            @AuthenticationPrincipal UserInfoDetails userInfoDetails,
            @Valid @RequestBody UpdateUserRequest request) {
        return ResponseEntity.ok(userService.patchUser(userInfoDetails.getUserId(), request));
    }

    @Operation(
            summary = "Delete a user",
            description = "Soft deletes a user by setting their active status to false")
    @DeleteMapping()
    public ResponseEntity<Void> deleteUser(@AuthenticationPrincipal UserInfoDetails userInfoDetails) {
        userService.deleteUser(userInfoDetails.getUserId());
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Get a user", description = "Retrieves user information by their ID")
    @GetMapping()
    public ResponseEntity<UserResponse> getUser(
            @AuthenticationPrincipal UserInfoDetails userInfoDetails) {
        return ResponseEntity.ok(userService.getUser(userInfoDetails.getUserId()));
    }
}
