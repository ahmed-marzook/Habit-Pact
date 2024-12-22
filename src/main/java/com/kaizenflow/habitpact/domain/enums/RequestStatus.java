package com.kaizenflow.habitpact.domain.enums;

import lombok.Getter;

@Getter
public enum RequestStatus {
    PENDING("PENDING"),
    ACCEPTED("ACCEPTED"),
    REJECTED("REJECTED");

    public final String value;

    RequestStatus(String value) {
        this.value = value;
    }

    public boolean isPending() {
        return this == PENDING;
    }

    public boolean isAccepted() {
        return this == ACCEPTED;
    }

    public boolean isRejected() {
        return this == REJECTED;
    }
}
