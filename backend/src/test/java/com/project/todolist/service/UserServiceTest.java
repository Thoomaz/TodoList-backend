package com.project.todolist.service;

import com.project.todolist.dto.request.UpdatePasswordRequest;
import com.project.todolist.dto.response.UserResponse;
import com.project.todolist.exceptions.UserNotFoundException;
import com.project.todolist.model.User;
import com.project.todolist.repository.TaskRepository;
import com.project.todolist.repository.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private UserService userService;

    @Test
    void createUser_returnsUserResponse() {
        User user = new User("alice", "pwd");
        user.setId(1L);

        when(userRepository.save(any())).thenReturn(user);
        when(taskRepository.countByUserIdAndDoneFalse(1L)).thenReturn(0L);

        UserResponse resp = userService.createUser(user);

        Assertions.assertEquals("alice", resp.username());
        Assertions.assertEquals(0L, resp.taskActive());
        verify(userRepository).save(any());
    }

    @Test
    void updatePassword_success() {
        User user = new User("bob", "old");
        user.setId(2L);

        when(userRepository.findById(2L)).thenReturn(Optional.of(user));

        UpdatePasswordRequest req = new UpdatePasswordRequest(2L, "old", "newpw");

        var resp = userService.updatePassword(req);

        Assertions.assertEquals(200, resp.getStatusCode().value());
        verify(userRepository).save(user);
    }

    @Test
    void updatePassword_wrongOldPassword_returnsBadRequest() {
        User user = new User("bob", "different");
        user.setId(3L);

        when(userRepository.findById(3L)).thenReturn(Optional.of(user));

        UpdatePasswordRequest req = new UpdatePasswordRequest(3L, "old", "newpw");

        var resp = userService.updatePassword(req);

        Assertions.assertEquals(400, resp.getStatusCode().value());
        verify(userRepository, never()).save(any());
    }

    @Test
    void updatePassword_userNotFound_throws() {
        when(userRepository.findById(99L)).thenReturn(Optional.empty());

        UpdatePasswordRequest req = new UpdatePasswordRequest(99L, "x", "y");

        Assertions.assertThrows(UserNotFoundException.class, () -> userService.updatePassword(req));
    }
}
