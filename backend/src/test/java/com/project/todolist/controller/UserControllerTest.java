package com.project.todolist.controller;

import com.project.todolist.dto.request.UpdatePasswordRequest;
import com.project.todolist.dto.request.UserCreateRequest;
import com.project.todolist.model.PriorityEnum;
import com.project.todolist.model.Task;
import com.project.todolist.service.TaskService;
import com.project.todolist.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import com.project.todolist.dto.request.DeleteUserRequest;
import com.project.todolist.dto.response.UserResponse;

@ExtendWith(MockitoExtension.class)
public class UserControllerTest {

    private MockMvc mockMvc;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Mock
    private UserService userService;

    @Mock
    private TaskService taskService;

    @InjectMocks
    private UserController userController;

    @BeforeEach
    void setup() {
        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
    }

    @Test
    void createUser_returnsOk() throws Exception {
        UserCreateRequest req = new UserCreateRequest("john", "pass");

        mockMvc.perform(post("/users/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isOk())
                .andExpect(content().string(org.hamcrest.Matchers.containsString("Usuário criado")));

        verify(userService).createUser(any());
    }

    @Test
    void updatePassword_delegatesToService() throws Exception {
        UpdatePasswordRequest req = new UpdatePasswordRequest(1L, "old", "newpass");

        when(userService.updatePassword(any())).thenReturn(org.springframework.http.ResponseEntity.ok("[SUCCESS]: Senha atualizada com sucesso"));

        mockMvc.perform(put("/users/update-password")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isOk())
                .andExpect(content().string(org.hamcrest.Matchers.containsString("Senha atualizada")));

        verify(userService).updatePassword(any());
    }

    @Test
    void getTasksByUserId_withoutPriority_returnsList() throws Exception {
        Task t = new Task("t1", "d", PriorityEnum.MODERATE, false, 1L);
        when(taskService.getTasksByUserId(1L)).thenReturn(List.of(t));

        mockMvc.perform(get("/users/1/tasks"))
                .andExpect(status().isOk())
                .andExpect(content().string(org.hamcrest.Matchers.containsString("t1")));
    }

    @Test
    void shouldFilterTasksByPriority() throws Exception {
        Task t = new Task("t2", "d2", PriorityEnum.NORMAL, false, 1L);
        when(taskService.getTasksByUserIdAndPriority(1L, 2L)).thenReturn(List.of(t));

        mockMvc.perform(get("/users/1/tasks")
                        .param("priority", "2"))
                .andExpect(status().isOk())
                .andExpect(content().string(org.hamcrest.Matchers.containsString("t2")));

        verify(taskService).getTasksByUserIdAndPriority(1L, 2L);
    }

    @Test
    void getUserById_returnsUserResponse() throws Exception {

        UserResponse response = new UserResponse("john", 5L);

        when(userService.getUserById(1L))
                .thenReturn(response);

        mockMvc.perform(get("/users/1"))
                .andExpect(status().isOk())
                .andExpect(content().string(
                        org.hamcrest.Matchers.containsString("john")
                ));

        verify(userService).getUserById(1L);
    }

    @Test
    void deleteUser_returnsSuccess() throws Exception {

        when(userService.deleteUser(any()))
                .thenReturn(
                        org.springframework.http.ResponseEntity
                                .ok("[SUCCESS]: Usuário deletado")
                );

        mockMvc.perform(
                        org.springframework.test.web.servlet.request.MockMvcRequestBuilders
                                .delete("/users/1")
                                .param("userId", "1")
                                .param("password", "123")
                )
                .andExpect(status().isOk())
                .andExpect(content().string(
                        org.hamcrest.Matchers.containsString("Usuário deletado")
                ));

        verify(userService).deleteUser(any());
    }
}
