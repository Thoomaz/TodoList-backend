package com.project.todolist.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DeleteUserRequest(@NotNull Long userId, @NotBlank String password){}
