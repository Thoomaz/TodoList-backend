package com.project.todolist.exceptions;

public class PriorityNotFoundException extends IllegalArgumentException {
    public PriorityNotFoundException(int id) {
        super("[ERROR]: Prioridade não identificada: " + id);
    }
}
