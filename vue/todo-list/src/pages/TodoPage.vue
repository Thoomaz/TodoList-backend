<template>
  <div>
    <div><h1>TuiDui List</h1></div>
    <TaskForm :task="editTask" @save="saveTask" />
    <div style="margin: 1rem">
      <button @click="setFilter('pending')" :class="filterBtn('pending')">
        Pendentes ({{ pendingTasks.length }})
      </button>
      <button @click="setFilter('completed')" :class="filterBtn('completed')">
        Concluídos ({{ completedTasks.length }})
      </button>
    </div>
    <TaskList
      :tasks="displayTasks"
      @toggle="toggle"
      @delete="remove"
      @edit="startEdit"
      :emptyMessage="
        filter === 'pending'
          ? 'Nenhuma tarefa pendente'
          : 'Nenhuma tarefa concluída'
      "
    />
  </div>
</template>

<script>
import TaskForm from "../components/TaskForm.vue";
import TaskList from "../components/TaskList.vue";
import taskApi from "../api/taskApi";

export default {
  components: { TaskForm, TaskList },
  data() {
    return {
      tasks: [],
      editTask: {
        id: null,
        title: "",
        description: "",
        priority: "",
        done: false,
      },
      filter: "pending",
    };
  },
  computed: {
    pendingTasks() {
      return this.tasks.filter((t) => !t.done);
    },
    completedTasks() {
      return this.tasks.filter((t) => t.done);
    },
    displayTasks() {
      return this.filter === "pending"
        ? this.pendingTasks
        : this.completedTasks;
    },
  },
  mounted() {
    this.load();
  },
  methods: {
    async load() {
      this.tasks = (await taskApi.getAll()).data;
    },
    setFilter(f) {
      this.filter = f;
    },
    filterBtn(view) {
      return this.filter === view
        ? "flex-1 py-2 rounded transition-all text-sm bg-[#E8E1D9] text-[#151515]"
        : "flex-1 py-2 rounded transition-all text-sm bg-transparent text-[#E8E1D9] border border-[#E8E1D9] border-opacity-20 hover:border-opacity-40";
    },
    startEdit(task) {
      this.editTask = { ...task };
    },
    async saveTask(task) {
      if (task.id) await taskApi.update(task.id, task);
      else await taskApi.create(task);
      this.editTask = {
        id: null,
        title: "",
        description: "",
        priority: "",
        done: false,
      };
      this.load();
    },
    async toggle(task) {
      await taskApi.update(task.id, { ...task, done: !task.done });
      this.load();
    },
    async remove(id) {
      await taskApi.delete(id);
      this.load();
    },
  },
};
</script>
