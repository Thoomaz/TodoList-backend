package com.project.todolist.service;

import com.project.todolist.dto.request.DeleteUserRequest;
import com.project.todolist.dto.request.UpdatePasswordRequest;
import com.project.todolist.dto.response.UserResponse;
import com.project.todolist.model.User;
import com.project.todolist.repository.TaskRepository;
import com.project.todolist.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TaskRepository taskRepository;

    public UserResponse createUser(User user){
        User userCreated = userRepository.save(user);
        return new UserResponse(userCreated.getUsername(), getTotalTeskActive(user.getId()));
    }

    public UserResponse getUserById(Long id){
        User user = userRepository.getReferenceById(id);
        return new UserResponse(user.getUsername(), getTotalTeskActive(user.getId()));
    }

    public ResponseEntity<String> deleteUser(DeleteUserRequest deleteRequest){
        User user = userRepository.getReferenceById(deleteRequest.userId());
        if (!user.getPassword().equals(deleteRequest.password())){
            return ResponseEntity.badRequest().body("[ERROR]: Senha informada incorretamente");
        }
        return ResponseEntity.ok("[SUCCESS]: Usuário deletado");
    }

    public ResponseEntity<String> updatePassword(UpdatePasswordRequest updatePassword){
        User user = userRepository.getReferenceById(updatePassword.userId());
        if (!user.getPassword().equals(updatePassword.oldPassword())){
            return ResponseEntity.badRequest().body("[ERROR]: Senha antiga informada incorretamente");
        }

        user.setPassword(updatePassword.newPassword());
        userRepository.save(user);
        return ResponseEntity.ok("[SUCCESS]: Senha atualizada com sucesso");
    }

    private Long getTotalTeskActive(Long id){
        return taskRepository.countByUserIdAndDoneFalse(id);
    }
}
