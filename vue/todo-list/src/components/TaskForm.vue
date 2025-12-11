<template>
  <form @submit.prevent="submit" class="form-container">
    <input
      v-model="localTask.title"
      placeholder="Título"
      class="form-element"
    />
    <textarea
      v-model="localTask.description"
      placeholder="Descrição"
      class="form-element"
    ></textarea>
    <select v-model="localTask.priority" class="form-element">
      <option disabled value="">Selecione a prioridade</option>
      <option value="0">🟢 Baixa</option>
      <option value="1">🟡 Média</option>
      <option value="2">🔴 Alta</option>
    </select>
    <button class="form-element btn">
      <Plus width="16" height="16" />
      {{ localTask.id ? "Salvar Alterações" : "Adicionar Tarefa" }}
    </button>
  </form>
</template>

<script>
import { Plus } from "lucide-vue-next";
export default {
  components: { Plus },
  props: ["task"],
  emits: ["save"],
  data() {
    return { localTask: { ...this.task } };
  },
  watch: {
    task(newVal) {
      this.localTask = { ...newVal };
    },
  },
  methods: {
    submit() {
      this.$emit("save", { ...this.localTask });
    },
  },
};
</script>

<style>
.form-container {
  background-color: #151515;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  gap: 12px; /* espaçamento consistente entre elementos */
  width: 40vw;
}

.form-element {
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  border: none;
  font-size: 1rem;
  box-sizing: border-box;
}

input.form-element,
textarea.form-element,
select.form-element {
  background-color: #e8e1d9;
  color: #151515;
}

textarea.form-element {
  resize: none;
  min-height: 80px;
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: #e8e1d9;
  color: #151515;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s;
}
.btn:hover {
  transform: scale(1.03);
}
</style>
