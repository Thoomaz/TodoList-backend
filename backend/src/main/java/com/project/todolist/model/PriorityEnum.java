package com.project.todolist.model;

import com.fasterxml.jackson.annotation.JsonValue;

public enum PriorityEnum {
    URGENT(0),
    MODERATE(1),
    NORMAL(2);

    private final int value;

    PriorityEnum(int value) {
        this.value = value;
    }

    @JsonValue
    public int getValue() {
        return value;
    }
}
