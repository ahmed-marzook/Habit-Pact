package com.kaizenflow.habitpact.controller;

import java.util.List;

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

import com.kaizenflow.habitpact.domain.dto.request.CreateHabitRequest;
import com.kaizenflow.habitpact.domain.dto.request.UpdateHabitRequest;
import com.kaizenflow.habitpact.domain.dto.response.HabitResponse;
import com.kaizenflow.habitpact.service.HabitService;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/habits")
@RequiredArgsConstructor
@Tag(name = "Habits", description = "Habit management APIs")
public class HabitController {
    private final HabitService habitService;

    @PostMapping
    public ResponseEntity<HabitResponse> createHabit(
            String userId, @Valid @RequestBody CreateHabitRequest request) {
        return ResponseEntity.ok(habitService.createHabit(userId, request));
    }

    @PutMapping("/{habitId}")
    public ResponseEntity<HabitResponse> updateHabit(
            String userId, @PathVariable String habitId, @Valid @RequestBody CreateHabitRequest request) {
        return ResponseEntity.ok(habitService.updateHabit(userId, habitId, request));
    }

    @PatchMapping("/{habitId}")
    public ResponseEntity<HabitResponse> patchHabit(
            String userId, @PathVariable String habitId, @Valid @RequestBody UpdateHabitRequest request) {
        return ResponseEntity.ok(habitService.patchHabit(userId, habitId, request));
    }

    @DeleteMapping("/{habitId}")
    public ResponseEntity<Void> deleteHabit(String userId, @PathVariable String habitId) {
        habitService.deleteHabit(userId, habitId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{habitId}")
    public ResponseEntity<HabitResponse> getHabit(String userId, @PathVariable String habitId) {
        return ResponseEntity.ok(habitService.getHabit(userId, habitId));
    }

    @GetMapping
    public ResponseEntity<List<HabitResponse>> getUserHabits(String userId) {
        return ResponseEntity.ok(habitService.getUserHabits(userId));
    }
}
