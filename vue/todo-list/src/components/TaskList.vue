<template>
  <div>
    <TaskItem
      v-for="t in tasks"
      :key="t.id"
      :task="t"
      @toggle="$emit('toggle', t)"
      @delete="$emit('delete', t.id)"
      @edit="$emit('edit', t)"
    />
    <p v-if="tasks.length === 0" class="text-[#e8e1d9] mt-4 text-center">
      {{ emptyMessage }}
    </p>
  </div>
</template>

<script>
import TaskItem from "./TaskItem.vue";
export default { props: ["tasks", "emptyMessage"], components: { TaskItem } };
</script>
