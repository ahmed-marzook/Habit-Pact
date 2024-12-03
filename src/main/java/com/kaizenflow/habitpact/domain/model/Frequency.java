package com.kaizenflow.habitpact.domain.model;

import com.kaizenflow.habitpact.domain.enums.HabitFrequency;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Frequency {
    private int times;
    private HabitFrequency period;
}
