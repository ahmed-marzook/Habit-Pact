package com.kaizenflow.habitpact.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
    @PostMapping
    public ResponseEntity<HabitCompletionResponse> recordCompletion(
            @AuthenticationPrincipal UserInfoDetails userInfoDetails,
            @PathVariable String habitId,
            @Valid @RequestBody CreateHabitCompletionRequest request) {
        return ResponseEntity.ok(
                completionService.recordCompletion(userInfoDetails.getUserId(), habitId, request));
    }

    @Operation(summary = "Update a habit completion")
    @PutMapping("/{completionId}")
    public ResponseEntity<HabitCompletionResponse> updateCompletion(
            @AuthenticationPrincipal UserInfoDetails userInfoDetails,
            @PathVariable String habitId,
            @PathVariable String completionId,
            @Valid @RequestBody CreateHabitCompletionRequest request) {
        return ResponseEntity.ok(
                completionService.updateCompletion(
                        userInfoDetails.getUserId(), habitId, completionId, request));
    }

    @Operation(summary = "Get completions for a date range")
    @GetMapping
    public ResponseEntity<List<HabitCompletionResponse>> getCompletions(
            @AuthenticationPrincipal UserInfoDetails userInfoDetails,
            @PathVariable String habitId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                    LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                    LocalDate endDate) {

        LocalDate effectiveEndDate = endDate != null ? endDate : LocalDate.now();
        LocalDate effectiveStartDate = startDate != null ? startDate : effectiveEndDate.minusDays(30);

        return ResponseEntity.ok(
                completionService.getCompletions(
                        userInfoDetails.getUserId(), habitId, effectiveStartDate, effectiveEndDate));
    }

    //    @Operation(summary = "Get completion summary for a date range")
    //    @GetMapping("/summary")
    //    public ResponseEntity<HabitCompletionSummary> getCompletionSummary(
    //            @AuthenticationPrincipal UserInfoDetails userInfoDetails,
    //            @PathVariable String habitId,
    //            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
    //            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
    //        return ResponseEntity.ok(
    //                completionService.getCompletionSummary(
    //                        userInfoDetails.getUserId(), habitId, startDate, endDate));
    //    }

    @Operation(summary = "Delete a habit completion")
    @DeleteMapping("/{completionId}")
    public ResponseEntity<Void> deleteCompletion(
            @AuthenticationPrincipal UserInfoDetails userInfoDetails,
            @PathVariable String habitId,
            @PathVariable String completionId) {
        completionService.deleteCompletion(userInfoDetails.getUserId(), habitId, completionId);
        return ResponseEntity.noContent().build();
    }
}
