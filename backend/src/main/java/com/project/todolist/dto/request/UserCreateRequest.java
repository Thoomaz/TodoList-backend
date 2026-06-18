package com.project.todolist.dto.request;


import jakarta.validation.constraints.NotBlank;

public record UserCreateRequest(@NotBlank String username, @NotBlank String password) {
}
