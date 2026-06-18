package com.project.todolist.exceptions;

public class UserNotFoundException extends IllegalArgumentException {
    public UserNotFoundException(Long id) {
        super("Usuário com id: {" + id + "} não identificado");
    }
}
