<template>
  <TodoPage />
</template>

<script>
import TodoPage from "./pages/TodoPage.vue";
export default { name: "App", components: { TodoPage } };
</script>

<style>
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    sans-serif;
}
</style>
