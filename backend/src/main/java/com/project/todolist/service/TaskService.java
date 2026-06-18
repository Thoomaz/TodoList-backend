package com.project.todolist.service;

import com.project.todolist.dto.request.CreateTaskRequest;
import com.project.todolist.exceptions.PriorityNotFoundException;
import com.project.todolist.exceptions.TaskNotFoundException;
import com.project.todolist.exceptions.UserNotFoundException;
import com.project.todolist.model.PriorityEnum;
import com.project.todolist.model.Task;
import com.project.todolist.model.User;
import com.project.todolist.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public Task createTask(CreateTaskRequest taskRequest) {
        Task task = new Task(
                taskRequest.title(),
                taskRequest.description(),
                taskRequest.priorityEnum(),
                false,
                taskRequest.userId());
        return taskRepository.save(task);
    }

    public List<Task> getTasksByUserId(Long userId) {
        List<Task> tasks = taskRepository.findByUserId(userId);
        if (tasks == null){
            throw new UserNotFoundException(userId);
        }
        return taskRepository.findByUserId(userId);
    }

    public List<Task> getTasksByUserIdAndPriority(Long userId, Long priority) {
        PriorityEnum priorityEnum = PriorityEnum.fromValue(priority.intValue());

        return taskRepository.findTasksByUserIdAndPriority(userId, priorityEnum);
    }

    public Task getTaskById(Long  id) {
        return taskRepository.findById(id).orElseThrow(() -> new TaskNotFoundException(id));
    }

    public Task checkTask(Long id){
        Task task = taskRepository.findById(id).orElseThrow(() -> new TaskNotFoundException(id));
        task.setDone(true);

        return task;
    }

    public Task updateTask(Long id, Task updateTask) {
        return taskRepository.findById(id)
                .map(task -> {
                    task.setTitle(updateTask.getTitle());
                    task.setDescription(updateTask.getDescription());
                    task.setPriority(updateTask.getPriority());
                    task.setDone(updateTask.getDone());
                    return taskRepository.save(task);
                })
                .orElseThrow(() -> new TaskNotFoundException(id));
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
}
