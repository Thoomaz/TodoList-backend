<template>
  <div class="task" :class="{ 'opacity-60': task.done }">
    <div>
      <h3 :class="{ 'line-through': task.done }">{{ task.title }}</h3>
      <p>{{ task.description }}</p>
      <span class="badge">{{ formattedPriority }}</span>
    </div>
    <div class="actions">
      <button @click="$emit('toggle', task)">✔</button>
      <button @click="$emit('edit', task)">✎</button>
      <button @click="$emit('delete', task.id)">✖</button>
    </div>
  </div>
</template>

<script>
import { formatPriority } from "../utils/priority";
export default {
  props: ["task"],
  computed: {
    formattedPriority() {
      return formatPriority(this.task.priority);
    },
  },
};
</script>

<style>
.task {
  background: #e8e1d9;
  color: #151515;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
}
.actions button {
  margin-left: 6px;
  padding: 8px;
  border-radius: 8px;
  background: #151515;
  color: #e8e1d9;
  transition: transform 0.2s;
}
.actions button:hover {
  transform: scale(1.1);
}
.badge {
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 0.8rem;
}
</style>
