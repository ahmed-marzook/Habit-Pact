package com.kaizenflow.habitpact.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kaizenflow.habitpact.domain.dto.request.CreateUserRequest;
import com.kaizenflow.habitpact.domain.dto.request.UpdateUserRequest;
import com.kaizenflow.habitpact.domain.dto.response.UserResponse;
import com.kaizenflow.habitpact.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Tag(name = "Users", description = "User management APIs")
public class UserController {
    private final UserService userService;

    @Operation(
            summary = "Create a new user",
            description = "Creates a new user with the provided information")
    @PostMapping
    public ResponseEntity<UserResponse> createUser(@Valid @RequestBody CreateUserRequest request) {
        return ResponseEntity.ok(userService.createUser(request));
    }

    @Operation(
            summary = "Update a user",
            description = "Fully updates a user's information. All fields must be provided.")
    @PutMapping("/{userId}")
    public ResponseEntity<UserResponse> updateUser(
            @PathVariable String userId, @Valid @RequestBody CreateUserRequest request) {
        return ResponseEntity.ok(userService.updateUser(userId, request));
    }

    @Operation(
            summary = "Partially update a user",
            description = "Updates only the provided fields of a user's information")
    @PatchMapping("/{userId}")
    public ResponseEntity<UserResponse> patchUser(
            @PathVariable String userId, @Valid @RequestBody UpdateUserRequest request) {
        return ResponseEntity.ok(userService.patchUser(userId, request));
    }

    @Operation(
            summary = "Delete a user",
            description = "Soft deletes a user by setting their active status to false")
    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable String userId) {
        userService.deleteUser(userId);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Get a user", description = "Retrieves user information by their ID")
    @GetMapping("/{userId}")
    public ResponseEntity<UserResponse> getUser(@PathVariable String userId) {
        return ResponseEntity.ok(userService.getUser(userId));
    }
}
