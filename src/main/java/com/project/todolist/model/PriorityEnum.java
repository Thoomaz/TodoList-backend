package com.project.todolist.model;

public enum PriorityEnum {
    URGENT(1),
    MODERATE(2),
    NORMAL(3);

    private final int value;

    PriorityEnum(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}
