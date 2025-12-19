import { Component, signal, inject, OnInit } from '@angular/core';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskListComponent } from './task-list/task-list.component';
import { Task } from './models/task.model';
import { TaskService } from './services/task.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskFormComponent, TaskListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private taskService = inject(TaskService);
  tasks = signal<Task[]>([]);
  
  // Sinal para controlar qual tarefa está sendo editada no momento
  editingTask = signal<Task | null>(null);

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks.set(tasks);
    });
  }

  // Adicionar ou Salvar Edição
  handleSaveTask(task: Task) {
    if (this.editingTask()) {
      // Modo Edição: Atualiza a tarefa existente
      if (task.id) {
        this.taskService.updateTask(task.id, task).subscribe(updatedTask => {
          this.tasks.update(current => 
            current.map(t => t.id === updatedTask.id ? updatedTask : t)
          );
          this.editingTask.set(null);
        });
      }
    } else {
      // Modo Adição: Adiciona nova tarefa
      this.taskService.createTask(task).subscribe(newTask => {
        this.tasks.update(current => [...current, newTask]);
      });
    }
  }

  // Prepara o formulário para edição
  handleEdit(task: Task) {
    this.editingTask.set(task);
  }

  // Alterna entre pendente/concluído
  handleToggle(task: Task) {
    if (task.id) {
      const updatedTask = { ...task, done: !task.done };
      this.taskService.updateTask(task.id, updatedTask).subscribe(result => {
         this.tasks.update(current => 
          current.map(t => t.id === result.id ? result : t)
        );
      });
    }
  }

  handleDelete(task: Task) {
    if (task.id) {
      this.taskService.deleteTask(task.id).subscribe(() => {
        this.tasks.update(current => current.filter(t => t.id !== task.id));
      });
    }
  }

  // (Opcional) Cancelar edição caso o usuário queira limpar o form
  handleCancelEdit() {
    this.editingTask.set(null);
  }
}