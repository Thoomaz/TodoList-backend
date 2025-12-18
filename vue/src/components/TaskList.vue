<template>
  <div class="container">
    <h1><img src="../assets/tuiduibg.svg" alt="TuiDui" /></h1>

    <div class="form-modal">
      <form @submit.prevent="handleSubmit" class="form">
        <input v-model="form.title" placeholder="Título" required />
        <textarea v-model="form.description" placeholder="Descrição" required />

        <select v-model.number="form.priority">
          <option :value="0">Sem pressa</option>
          <option :value="1">Quando der</option>
          <option :value="2">Pra ontem</option>
        </select>

        <button type="submit">
          {{ editing ? "Salvar alterações" : "Criar tarefa" }}
        </button>
      </form>
    </div>

    <div class="filters">
      <button @click="filter = 'ALL'">Todas</button>
      <button @click="filter = 'TODO'">A Fazer</button>
      <button @click="filter = 'DONE'">Concluídas</button>
    </div>

    <div class="tasks">
      <p v-if="filteredTasks.length === 0" class="empty">Lista vazia.</p>
      <ul v-else>
        <li v-for="task in filteredTasks" :key="task.id">
          <div>
            <input
              type="checkbox"
              :checked="task.done"
              @change="toggleDone(task)"
            />

            <strong :class="{ done: task.done }">
              {{ task.title }}
            </strong>

            <p>{{ task.description }}</p>
            <small>Prioridade: {{ priorityLabel(task.priority) }}</small>
          </div>

          <div class="actions">
            <button id="edit" @click="editTask(task)"><SquarePen /></button>
            <button id="delete" @click="deleteTask(task.id)"><Trash2 /></button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useTaskList } from "../composables/useTaskList";
import { SquarePen, Trash2 } from "lucide-vue-next";

const {
  form,
  filter,
  editing,
  priorityLabel,
  handleSubmit,
  editTask,
  deleteTask,
  toggleDone,
  filteredTasks,
} = useTaskList();
</script>

<style scoped src="../css/TaskList.css"></style>
