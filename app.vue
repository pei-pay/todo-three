<script lang="ts">
import { Todo } from '~/entity/todo';
</script>

<script setup lang="ts">

// FIXME: use prisma type
const { data: todos, refresh } = useFetch<Todo[]>('/api/todo/base');

const newTodoTitle = ref<string>('');

const completedTodos = computed(() => todos.value?.filter(todo => todo.isCompleted) ?? []);
const uncompletedTodos = computed(() => todos.value?.filter(todo => !todo.isCompleted) ?? []);

const addTodo = async () => {
  if (newTodoTitle.value.trim() === '') return;
  await useFetch('/api/todo/base', {
    method: 'post',
    body: { title: newTodoTitle.value },
  });
  refresh()
  newTodoTitle.value = '';
};

const updateTodoTitle = async (id: number, title: string) => {
  await useFetch('/api/todo/base', {
    method: 'put',
    body: { id: id, title: title },
  });
  refresh()
};

const updateTodoCompletedStatus = async (id: number, isCompleted: boolean) => {
  await useFetch('/api/todo/completedStatus', {
    method: 'put',
    body: { id: id, isCompleted },
  });
  refresh()
};
const deleteTodo = async (id: number) => {
  await useFetch('/api/todo/base', {
    method: 'delete',
    body: { id },
  });
  refresh()
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
      <TodoItem
        v-for="todo in uncompletedTodos.filter(todo => !todo.isCompleted)" :key="todo.id"
        :todo="todo"
        @handle-update-title="updateTodoTitle" @handle-update-completed-status="updateTodoCompletedStatus" @handle-delete="deleteTodo" 
      />
    </ul>

    <div v-if="completedTodos.length">
      <p>Completed todos</p>
      <ul>
        <TodoItem
          v-for="todo in completedTodos.filter(todo => todo.isCompleted)" :key="todo.id"
          :todo="todo"
          @handle-update-title="updateTodoTitle" @handle-update-completed-status="updateTodoCompletedStatus" @handle-delete="deleteTodo" 
        />
      </ul>
    </div>
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
}
</style>