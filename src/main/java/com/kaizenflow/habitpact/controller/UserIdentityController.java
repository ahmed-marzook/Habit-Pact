package com.kaizenflow.habitpact.controller;

import com.kaizenflow.habitpact.config.security.UserInfoDetails;
import com.kaizenflow.habitpact.domain.dto.response.UserAuthResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kaizenflow.habitpact.config.security.JwtService;
import com.kaizenflow.habitpact.domain.dto.request.AuthRequest;
import com.kaizenflow.habitpact.domain.dto.request.CreateUserRequest;
import com.kaizenflow.habitpact.domain.dto.response.UserResponse;
import com.kaizenflow.habitpact.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(name = "User Identity", description = "User registration and authentication APIs")
public class UserIdentityController {
    private final UserService userService;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    @Operation(
            summary = "Authenticate user and login",
            description = "Authenticate user credentials and generate JWT token for user login")
    @PostMapping("/login")
    public ResponseEntity<UserAuthResponse> authenticateUser(@RequestBody AuthRequest authRequest) {
        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(authRequest.email(), authRequest.password()));
        if (authentication.isAuthenticated()) {
            UserInfoDetails principle = (UserInfoDetails) authentication.getPrincipal();
            UserResponse userResponse = new UserResponse(null, principle.getEmail(), principle.getDbUsername(), principle.getFirstName(), principle.getLastName(), null, null, null);
            UserAuthResponse authResponse = new UserAuthResponse(userResponse, jwtService.generateToken(authRequest.email()), null);
            return ResponseEntity.ok(authResponse);
        } else {
            throw new UsernameNotFoundException("Invalid user request!");
        }
    }

    @Operation(
            summary = "Register a new user",
            description = "Register a new user with the provided information")
    @PostMapping("/register")
    public ResponseEntity<UserResponse> registerUser(@Valid @RequestBody CreateUserRequest request) {
        return ResponseEntity.ok(userService.createUser(request));
    }
}
