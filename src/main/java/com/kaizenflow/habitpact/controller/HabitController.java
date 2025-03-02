package com.kaizenflow.habitpact.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kaizenflow.habitpact.config.security.UserInfoDetails;
import com.kaizenflow.habitpact.domain.dto.request.CreateHabitRequest;
import com.kaizenflow.habitpact.domain.dto.response.HabitResponse;
import com.kaizenflow.habitpact.service.HabitService;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/habits")
@RequiredArgsConstructor
@Tag(name = "Habits", description = "Habit management APIs")
public class HabitController {
    private final HabitService habitService;

    @PostMapping
    public ResponseEntity<HabitResponse> createHabit(
            @AuthenticationPrincipal UserInfoDetails userInfoDetails,
            @Valid @RequestBody CreateHabitRequest request) {
        return ResponseEntity.ok(habitService.createHabit(userInfoDetails.getUserId(), request));
    }

    //    @PutMapping("/{habitId}")
    //    public ResponseEntity<HabitResponse> updateHabit(
    //            @AuthenticationPrincipal UserInfoDetails userInfoDetails,
    //            @PathVariable String habitId,
    //            @Valid @RequestBody CreateHabitRequest request) {
    //        return ResponseEntity.ok(
    //                habitService.updateHabit(userInfoDetails.getUserId(), habitId, request));
    //    }
    //
    //    @PatchMapping("/{habitId}")
    //    public ResponseEntity<HabitResponse> patchHabit(
    //            @AuthenticationPrincipal UserInfoDetails userInfoDetails,
    //            @PathVariable String habitId,
    //            @Valid @RequestBody UpdateHabitRequest request) {
    //        return ResponseEntity.ok(
    //                habitService.patchHabit(userInfoDetails.getUserId(), habitId, request));
    //    }
    //
    //    @DeleteMapping("/{habitId}")
    //    public ResponseEntity<Void> deleteHabit(
    //            @AuthenticationPrincipal UserInfoDetails userInfoDetails, @PathVariable String
    // habitId) {
    //        habitService.deleteHabit(userInfoDetails.getUserId(), habitId);
    //        return ResponseEntity.noContent().build();
    //    }
    //
    //    @GetMapping("/{habitId}")
    //    public ResponseEntity<HabitResponse> getHabit(
    //            @AuthenticationPrincipal UserInfoDetails userInfoDetails, @PathVariable String
    // habitId) {
    //        return ResponseEntity.ok(habitService.getHabit(userInfoDetails.getUserId(), habitId));
    //    }
    //
    //    @GetMapping
    //    public ResponseEntity<List<HabitResponse>> getUserHabits(
    //            @AuthenticationPrincipal UserInfoDetails userInfoDetails) {
    //        return ResponseEntity.ok(habitService.getUserHabits(userInfoDetails.getUserId()));
    //    }
}
