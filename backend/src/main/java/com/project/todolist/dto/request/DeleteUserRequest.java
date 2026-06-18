package com.project.todolist.dto.request;

import jakarta.validation.constraints.NotBlank;

public record DeleteUserRequest(@NotBlank Long userId, @NotBlank String password){}
