package com.kaizenflow.habitpact.controller;

import java.time.LocalDate;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kaizenflow.habitpact.config.security.UserInfoDetails;
import com.kaizenflow.habitpact.domain.dto.request.CreateHabitCompletionRequest;
import com.kaizenflow.habitpact.domain.dto.response.HabitCompletionResponse;
import com.kaizenflow.habitpact.service.HabitCompletionService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/habits/{habitId}/completions")
@RequiredArgsConstructor
@Tag(name = "Habit Completions", description = "APIs for managing habit completion records")
public class HabitCompletionController {
    private final HabitCompletionService completionService;

    @Operation(summary = "Record a habit completion")
    @PutMapping
    public ResponseEntity<HabitCompletionResponse> recordCompletion(
            @AuthenticationPrincipal UserInfoDetails userInfoDetails,
            @PathVariable String habitId,
            @Valid @RequestBody CreateHabitCompletionRequest request) {
        return ResponseEntity.ok(
                completionService.recordCompletion(userInfoDetails.getUserId(), habitId, request));
    }

    @DeleteMapping("/{year}/{month}/{day}")
    public ResponseEntity<HabitCompletionResponse> deleteHabitCompletion(
            @AuthenticationPrincipal UserInfoDetails userInfoDetails,
            @PathVariable String habitId,
            @PathVariable int year,
            @PathVariable int month,
            @PathVariable int day) {

        // Create LocalDate from path variables
        LocalDate completionDate = LocalDate.of(year, month, day);

        // Get user ID from authenticated principal
        String userId = userInfoDetails.getUserId();

        // Call service to delete the completion
        HabitCompletionResponse response =
                completionService.deleteCompletion(userId, habitId, completionDate);

        if (response.deleted()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
