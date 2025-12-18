import { ref, computed, onMounted } from "vue";
import { taskService } from "../services/taskService";

export function useTaskList() {
  const tasks = ref([]);
  const filter = ref("ALL");
  const editing = ref(false);
  const editingId = ref(null);

  const form = ref({
    title: "",
    description: "",
    priority: 0,
    done: false,
  });

  const priorityLabel = (priority) => {
    switch (priority) {
      case 0:
        return "Sem pressa";
      case 1:
        return "Quando der";
      case 2:
        return "Pra ontem";
      default:
        return "Não definida";
    }
  };

  async function loadTasks() {
    const { data } = await taskService.getAll();
    tasks.value = data;
  }

  async function handleSubmit() {
    if (editing.value) {
      await taskService.update(editingId.value, form.value);
    } else {
      await taskService.create(form.value);
    }

    resetForm();
    loadTasks();
  }

  function editTask(task) {
    form.value = { ...task };
    editing.value = true;
    editingId.value = task.id;
  }

  async function deleteTask(id) {
    await taskService.delete(id);
    loadTasks();
  }

  async function toggleDone(task) {
    await taskService.update(task.id, {
      ...task,
      done: !task.done,
    });
    loadTasks();
  }

  function resetForm() {
    form.value = {
      title: "",
      description: "",
      priority: 0,
      done: false,
    };
    editing.value = false;
    editingId.value = null;
  }

  const filteredTasks = computed(() => {
    if (filter.value === "TODO") {
      return tasks.value.filter((t) => !t.done);
    }
    if (filter.value === "DONE") {
      return tasks.value.filter((t) => t.done);
    }
    return tasks.value;
  });

  onMounted(loadTasks);

  return {
    form,
    filter,
    editing,
    priorityLabel,
    handleSubmit,
    editTask,
    deleteTask,
    toggleDone,
    filteredTasks,
  };
}
