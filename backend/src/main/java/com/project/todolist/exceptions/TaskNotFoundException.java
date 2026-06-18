package com.project.todolist.exceptions;

public class TaskNotFoundException extends IllegalArgumentException {
    public TaskNotFoundException(Long id) {
        super("[ERROR]: Tarefa não encontrada id: " + id);
    }
}
