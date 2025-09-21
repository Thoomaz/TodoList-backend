package com.project.todolist.model;

import jakarta.persistence.*;


@Entity
@Table(name = "task")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private PriorityEnum priority;
    private Boolean done;

    public Task() {}

    public Task(Long id, String title, String description, PriorityEnum priority, Boolean done) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.done = done;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    public PriorityEnum getPriority() {
        return priority;
    }
    public void setPriority(PriorityEnum priority) {
        this.priority = priority;
    }

    public Boolean getDone() {
        return done;
    }
    public void setDone(Boolean done) {
        this.done = done;
    }
}
