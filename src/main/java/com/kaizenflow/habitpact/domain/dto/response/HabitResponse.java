package com.kaizenflow.habitpact.domain.dto.response;

import java.time.LocalDateTime;
import java.util.List;

import com.kaizenflow.habitpact.domain.model.Frequency;
import com.kaizenflow.habitpact.domain.model.Reminder;
import com.kaizenflow.habitpact.domain.model.Streak;

public record HabitResponse(
        String id,
        String userId,
        String name,
        String description,
        Frequency frequency,
        List<String> tags,
        boolean archived,
        Streak streak,
        Reminder reminder,
        LocalDateTime createdAt,
        LocalDateTime updatedAt) {}
