package com.project.todolist.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.todolist.dto.request.CreateTaskRequest;
import com.project.todolist.model.PriorityEnum;
import com.project.todolist.model.Task;
import com.project.todolist.service.TaskService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class TaskControllerTest {

    private MockMvc mockMvc;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Mock
    private TaskService taskService;

    @InjectMocks
    private TaskController taskController;

    @BeforeEach
    void setup() {
        mockMvc = MockMvcBuilders
                .standaloneSetup(taskController)
                .build();
    }

    @Test
    void createTask_returnsTask() throws Exception {

        CreateTaskRequest request =
                new CreateTaskRequest(
                        1L,
                        "Estudar Testes",
                        "Mockito",
                        PriorityEnum.NORMAL
                );

        Task task =
                new Task(
                        "Estudar Testes",
                        "Mockito",
                        PriorityEnum.NORMAL,
                        false,
                        1L
                );

        when(taskService.createTask(any()))
                .thenReturn(task);

        mockMvc.perform(
                        post("/task")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(
                                        objectMapper.writeValueAsString(request)
                                )
                )
                .andExpect(status().isOk())
                .andExpect(content().string(
                        org.hamcrest.Matchers.containsString("Estudar Testes")
                ));

        verify(taskService).createTask(any());
    }
}