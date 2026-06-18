package com.project.todolist.service;

import com.project.todolist.model.PriorityEnum;
import com.project.todolist.model.Task;
import com.project.todolist.repository.TaskRepository;
import com.project.todolist.exceptions.UserNotFoundException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskService taskService;

    @Test
    void getTasksByUserId_returnsList() {
        Task t = new Task("t1","d", PriorityEnum.MODERATE, false, 1L);
        when(taskRepository.findByUserId(1L)).thenReturn(List.of(t));

        var res = taskService.getTasksByUserId(1L);

        Assertions.assertFalse(res.isEmpty());
        Assertions.assertEquals("t1", res.get(0).getTitle());
    }

    @Test
    void getTasksByUserId_whenNull_throwsUserNotFound() {
        when(taskRepository.findByUserId(2L)).thenReturn(null);

        Assertions.assertThrows(UserNotFoundException.class, () -> taskService.getTasksByUserId(2L));
    }

    @Test
    void getTasksByUserIdAndPriority_delegates() {
        Task t = new Task("t2","d2", PriorityEnum.NORMAL, false, 3L);
        when(taskRepository.findTasksByUserIdAndPriority(3L, PriorityEnum.fromValue(2))).thenReturn(List.of(t));

        var res = taskService.getTasksByUserIdAndPriority(3L, 2L);

        Assertions.assertEquals(1, res.size());
        Assertions.assertEquals("t2", res.get(0).getTitle());
    }

}
