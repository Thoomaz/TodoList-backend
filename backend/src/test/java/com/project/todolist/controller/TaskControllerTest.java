package com.project.todolist.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.todolist.exceptions.TaskNotFoundException;
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

import static org.junit.jupiter.api.Assertions.assertInstanceOf;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
public class TaskControllerTest {

    private MockMvc mockMvc;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Mock
    private TaskService taskService;

    @InjectMocks
    private TaskController taskController;

    @BeforeEach
    void setup() {
        mockMvc = MockMvcBuilders.standaloneSetup(taskController).build();
    }

    // ------------------------------------------------------------------ getTaskById

    @Test
    void getTaskById_quandoTarefaExiste_retornaOkComTarefa() throws Exception {
        Task task = new Task("Estudar", "Revisar matéria", PriorityEnum.MODERATE, false, 1L);
        task.setId(10L);
        when(taskService.getTaskById(10L)).thenReturn(task);

        mockMvc.perform(get("/task/10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Estudar"))
                .andExpect(jsonPath("$.description").value("Revisar matéria"))
                .andExpect(jsonPath("$.done").value(false))
                .andExpect(jsonPath("$.priority").value(PriorityEnum.MODERATE.getValue()));

        verify(taskService).getTaskById(10L);
    }

    @Test
    void getTaskById_quandoTarefaNaoExiste_propagaExcecao() {
        when(taskService.getTaskById(99L)).thenThrow(new TaskNotFoundException(99L));

        Exception ex = assertThrows(Exception.class, () ->
                mockMvc.perform(get("/task/99")).andReturn());

        assertInstanceOf(TaskNotFoundException.class, ex.getCause());
    }

    // ------------------------------------------------------------------ checkTask

    @Test
    void checkTask_quandoTarefaExiste_retornaOkComDoneTrue() throws Exception {
        Task task = new Task("Tarefa concluída", "desc", PriorityEnum.NORMAL, true, 1L);
        task.setId(5L);
        when(taskService.checkTask(5L)).thenReturn(task);

        mockMvc.perform(put("/task/5/check"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.done").value(true))
                .andExpect(jsonPath("$.title").value("Tarefa concluída"));

        verify(taskService).checkTask(5L);
    }

    @Test
    void checkTask_delegaIdCorretoAoService() throws Exception {
        Task task = new Task("T", "D", PriorityEnum.URGENT, false, 2L);
        task.setId(8L);
        when(taskService.checkTask(8L)).thenReturn(task);

        mockMvc.perform(put("/task/8/check"))
                .andExpect(status().isOk());

        verify(taskService).checkTask(8L);
    }

    // ------------------------------------------------------------------ updateTask

    @Test
    void updateTask_quandoDadosValidos_retornaOkComTarefaAtualizada() throws Exception {
        Task payload = new Task("Título novo", "Desc nova", PriorityEnum.URGENT, false, 1L);
        Task updated  = new Task("Título novo", "Desc nova", PriorityEnum.URGENT, false, 1L);
        updated.setId(3L);

        when(taskService.updateTask(eq(3L), any(Task.class))).thenReturn(updated);

        mockMvc.perform(put("/task/3")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Título novo"))
                .andExpect(jsonPath("$.description").value("Desc nova"))
                .andExpect(jsonPath("$.priority").value(PriorityEnum.URGENT.getValue()));

        verify(taskService).updateTask(eq(3L), any(Task.class));
    }

    @Test
    void updateTask_quandoTarefaNaoExiste_propagaExcecao() throws Exception {
        Task payload = new Task("X", "Y", PriorityEnum.NORMAL, false, 1L);
        when(taskService.updateTask(eq(99L), any(Task.class))).thenThrow(new TaskNotFoundException(99L));

        Exception ex = assertThrows(Exception.class, () ->
                mockMvc.perform(put("/task/99")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload))).andReturn());

        assertInstanceOf(TaskNotFoundException.class, ex.getCause());
    }

    // ------------------------------------------------------------------ deleteTask

    @Test
    void deleteTask_quandoTarefaExiste_retornaOkComMensagem() throws Exception {
        doNothing().when(taskService).deleteTask(7L);

        mockMvc.perform(delete("/task/7"))
                .andExpect(status().isOk())
                .andExpect(content().string("[SUCCESS]: Tarefa deletada: 7"));

        verify(taskService).deleteTask(7L);
    }

    @Test
    void deleteTask_quandoTarefaNaoExiste_propagaExcecao() {
        doThrow(new TaskNotFoundException(99L)).when(taskService).deleteTask(99L);

        Exception ex = assertThrows(Exception.class, () ->
                mockMvc.perform(delete("/task/99")).andReturn());

        assertInstanceOf(TaskNotFoundException.class, ex.getCause());
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
