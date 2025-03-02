package com.kaizenflow.habitpact.domain.model.habit;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Reminder {
    @Builder.Default private boolean enabled = false;
    private String time;
    private List<String> days;
}
