<script lang="ts">
</script>

<script setup lang="ts">

// FIXME: useFetch type definition
const { data: todos, refresh } = useFetch('/api/todo');

const newTodoTitle = ref<string>('');

const addTodo = async () => {
  if (newTodoTitle.value.trim() === '') return;
  await useFetch('/api/todo', {
    method: 'post',
    body: { title: newTodoTitle.value },
  });
  refresh()
  newTodoTitle.value = '';
};

const updateTodoTitle = async (id: number, title: string) => {
  await useFetch('/api/todo', {
    method: 'put',
    body: { id: id, title: title },
  });
  refresh()
};

const updateTodoCompletedStatus = (id: number, isCompleted: boolean) => {
  // TODO: update todo completed status 
  // console.log('isCompleted', isCompleted)
  // todos.value = todos.value.map(todo => todo.id === id ? {...todo, isCompleted} : todo)
  // console.log('test', todos.value)
};
const deleteTodo = async (id: number) => {
  await useFetch('/api/todo', {
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
        v-for="todo in todos" :key="todo.id"
        :todo="todo"
        @handle-update-title="updateTodoTitle" @handle-update-completed-status="updateTodoCompletedStatus" @handle-delete="deleteTodo" 
      />
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
}
</style>