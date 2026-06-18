package com.project.todolist.model;

import com.fasterxml.jackson.annotation.JsonValue;
import com.project.todolist.exceptions.PriorityNotFoundException;

import java.util.Arrays;

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

    public static PriorityEnum fromValue(int value) {
        return Arrays.stream(values())
                .filter(p -> p.getValue() == value)
                .findFirst()
                .orElseThrow(() ->
                        new PriorityNotFoundException(value));
    }
}
