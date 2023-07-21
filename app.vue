<script lang="ts">
interface Todo {
  id: number;
  title: string;
}
</script>

<script setup lang="ts">
const todos = ref<Todo[]>([]);
const newTodoTitle = ref<string>('');

const addTodo = () => {
  if (newTodoTitle.value.trim() === '') return;
  const todo: Todo = {
    id: todos.value.length + 1,
    title: newTodoTitle.value.trim(),
  };
  todos.value.push(todo);
  newTodoTitle.value = '';
};

const removeTodo = (id: number) => {
  const index = todos.value.findIndex(todo => todo.id === id);
  if (index !== -1) {
    todos.value.splice(index, 1);
  }
};
</script>

<template>
  <div class="container">
    <h1>Three Todo</h1>
    <div class="input-container">
      <input v-model="newTodoTitle" @keyup.enter="addTodo" placeholder="Add a new todo" />
      <button @click="addTodo">Add</button>
    </div>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <span>{{ todo.title }}</span>
        <button @click="removeTodo(todo.id)">Remove</button>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
}

.input-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  input {
    flex: 1;
    padding: 5px;
  }

  button {
    margin-left: 10px;
    padding: 5px 10px;
  }
}

ul {
  list-style: none;
  padding: 0;

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px;
    border: 1px solid #ccc;
    margin-bottom: 5px;

    button {
      background-color: red;
      color: white;
    }
  }
}
</style>
