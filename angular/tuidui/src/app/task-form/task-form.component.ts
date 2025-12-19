import { Component, output, input, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  // Input: Recebe a tarefa para editar (pode ser null)
  taskToEdit = input<Task | null>(null);

  // Outputs atualizados
  saveTask = output<Task>(); // Serve tanto para adicionar quanto editar
  cancelEdit = output<void>();

  title = '';
  description = '';
  priority: number = 2;
  
  // ID interno para saber se estamos editando
  private editingId: number | null = null;

  constructor() {
    // Effect: Observa mudanças no input taskToEdit e preenche o form
    effect(() => {
      const task = this.taskToEdit();
      if (task) {
        this.title = task.title;
        this.description = task.description || '';
        this.priority = task.priority;
        this.editingId = task.id || null;
      } else {
        this.resetForm();
      }
    });
  }

  onSubmit() {
    if (!this.title.trim()) return;

    const task: Task = {
      id: this.editingId ? this.editingId : undefined,
      title: this.title,
      description: this.description,
      priority: this.priority,
      done: this.taskToEdit()?.done || false // Mantém status se editando
    };

    this.saveTask.emit(task);
    this.resetForm();
  }

  onCancel() {
    this.resetForm();
    this.cancelEdit.emit();
  }

  private resetForm() {
    this.title = '';
    this.description = '';
    this.priority = 2;
    this.editingId = null;
  }
}