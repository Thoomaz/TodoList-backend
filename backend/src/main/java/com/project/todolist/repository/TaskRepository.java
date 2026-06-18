package com.project.todolist.repository;

import com.project.todolist.model.PriorityEnum;
import com.project.todolist.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    long countByUserIdAndDoneFalse(Long userId);
    List<Task> findByUserId(Long userId);
    List<Task> findTasksByUserIdAndPriority(Long userId, PriorityEnum priority);
}
