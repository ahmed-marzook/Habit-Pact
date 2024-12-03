package com.kaizenflow.habitpact.domain.enums;

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
