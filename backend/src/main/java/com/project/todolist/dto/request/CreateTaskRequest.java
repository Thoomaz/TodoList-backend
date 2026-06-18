package com.project.todolist.dto.request;

import com.project.todolist.model.PriorityEnum;

public record CreateTaskRequest(Long userId,
                                String title,
                                String description,
                                PriorityEnum priorityEnum
                                ) {
}
