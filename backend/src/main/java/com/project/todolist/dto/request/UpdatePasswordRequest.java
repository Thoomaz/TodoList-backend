package com.project.todolist.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UpdatePasswordRequest(@NotNull Long userId, @NotBlank String oldPassword, @NotBlank String newPassword) {
}
