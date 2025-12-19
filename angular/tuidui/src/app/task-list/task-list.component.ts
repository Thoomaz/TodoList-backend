import { Component, input, output, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  tasks = input.required<Task[]>();
  
  // Novos outputs
  toggleComplete = output<Task>();
  editTask = output<Task>();
  deleteTask = output<Task>();

  filter = signal<'pending' | 'completed'>('pending');

  filteredTasks = computed(() => {
    const isDone = this.filter() === 'completed';
    return this.tasks().filter(t => t.done === isDone);
  });

  pendingCount = computed(() => this.tasks().filter(t => !t.done).length);
  completedCount = computed(() => this.tasks().filter(t => t.done).length);

  setFilter(type: 'pending' | 'completed') {
    this.filter.set(type);
  }

  getPriorityLabel(priority: number): string {
    switch (priority) {
      case 0: return 'Alta';
      case 1: return 'Média';
      case 2: return 'Baixa';
      default: return 'Desconhecida';
    }
  }
}