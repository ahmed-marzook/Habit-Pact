package com.kaizenflow.habitpact.domain.model.habit;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Streak {
    @Builder.Default private int current = 0;
    @Builder.Default private int longest = 0;
    private LocalDateTime lastCompletedAt;
}
