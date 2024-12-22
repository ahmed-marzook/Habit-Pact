package com.kaizenflow.habitpact.domain.enums;

import lombok.Getter;

@Getter
public enum HabitFrequency {
    DAILY("DAILY"),
    WEEKLY("WEEKLY"),
    MONTHLY("MONTHLY"),
    YEARLY("YEARLY");

    public final String value;

    HabitFrequency(String value) {
        this.value = value;
    }
}
