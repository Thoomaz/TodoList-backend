package com.project.todolist.controller;

import com.project.todolist.dto.request.DeleteUserRequest;
import com.project.todolist.dto.request.UpdatePasswordRequest;
import com.project.todolist.dto.request.UserCreateRequest;
import com.project.todolist.dto.response.UserResponse;
import com.project.todolist.model.Task;
import com.project.todolist.model.User;
import com.project.todolist.service.TaskService;
import com.project.todolist.service.UserService;
import jakarta.validation.Valid;
import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService service;

    @Autowired
    private TaskService taskService;

    @PostMapping("/create")
    public ResponseEntity<String> createUser(@RequestBody @Valid UserCreateRequest userCreate){
        User user = new User(userCreate.username(), userCreate.password());
        service.createUser(user);

        return ResponseEntity.ok("[SUCCESS]: Usuário criado com sucesso");
    }

    @PutMapping("/update-password")
    public ResponseEntity<String> updatePassword(@RequestBody @Valid UpdatePasswordRequest updatePassword){
        return service.updatePassword(updatePassword);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long id){
        return ResponseEntity.ok(service.getUserById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@Valid DeleteUserRequest deleteRequest){
        return service.deleteUser(deleteRequest);
    }

    @GetMapping("/{userId}/tasks")
    public ResponseEntity<List<Task>> getTasksByUserId(@RequestParam(required = false) Long priority, @PathVariable Long userId) {
        if (priority != null) {
            return ResponseEntity.ok(taskService.getTasksByUserIdAndPriority(userId, priority));
        }

        return ResponseEntity.ok(taskService.getTasksByUserId(userId));
    }
}
