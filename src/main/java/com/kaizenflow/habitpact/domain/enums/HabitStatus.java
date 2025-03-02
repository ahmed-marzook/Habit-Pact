package com.kaizenflow.habitpact.domain.enums;

import lombok.Getter;

@Getter
public enum HabitStatus {
    PENDING("PENDING"),
    COMPLETED("COMPLETED"),
    FAILED("FAILED");

    public final String value;

    HabitStatus(String value) {
        this.value = value;
    }
}
