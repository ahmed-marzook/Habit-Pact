package com.kaizenflow.habitpact.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kaizenflow.habitpact.config.security.UserInfoDetails;
import com.kaizenflow.habitpact.domain.dto.response.FriendRequestResponse;
import com.kaizenflow.habitpact.domain.enums.RequestStatus;
import com.kaizenflow.habitpact.service.FriendService;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/friends")
@RequiredArgsConstructor
@Tag(name = "Friends", description = "Friends management APIs")
public class FriendController {
    private final FriendService friendService;

    @PostMapping("/request")
    public ResponseEntity<FriendRequestResponse> sendRequest(
            @AuthenticationPrincipal UserInfoDetails userInfoDetails,
            @RequestParam String receiverEmail) {
        return ResponseEntity.ok(
                friendService.sendFriendRequest(userInfoDetails.getUserId(), receiverEmail));
    }

    @PutMapping("/request/{requestId}")
    public ResponseEntity<FriendRequestResponse> respondToRequest(
            @PathVariable String requestId, @RequestParam RequestStatus status) {
        return ResponseEntity.ok(friendService.respondToRequest(requestId, status));
    }

    @GetMapping("/pending")
    public ResponseEntity<List<FriendRequestResponse>> getPendingRequests(
            @RequestParam String userId) {
        return ResponseEntity.ok(friendService.getPendingRequests(userId));
    }
}
