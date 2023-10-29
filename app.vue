<script lang="ts">
import { Todo } from '~/entity/todo';
import { useBottomDrawerCtx } from '~/components/BottomDrawer.vue';
</script>

<script setup lang="ts">

// FIXME: use prisma type
const { data: todos, refresh } = useFetch<Todo[]>('/api/todo/base');

const bottomDrawerCtx = useBottomDrawerCtx();

const newTodoTitle = ref<string>('');

const completedTodos = computed(() => todos.value?.filter(todo => todo.isCompleted) ?? []);
const uncompletedTodos = computed(() => todos.value?.filter(todo => !todo.isCompleted) ?? []);

const addTodo = async () => {
  if (newTodoTitle.value.trim() === '') return;
  await useFetch('/api/todo/base', {
    method: 'post',
    body: { title: newTodoTitle.value },
  });
  refresh();
  newTodoTitle.value = '';
};

const updateTodoTitle = async (id: number, title: string) => {
  await useFetch('/api/todo/base', {
    method: 'put',
    body: { id: id, title: title },
  });
  refresh();
};

const updateTodoCompletedStatus = async (id: number, isCompleted: boolean) => {
  await useFetch('/api/todo/completedStatus', {
    method: 'put',
    body: { id: id, isCompleted },
  });
  refresh();
};
const deleteTodo = async (id: number) => {
  await useFetch('/api/todo/base', {
    method: 'delete',
    body: { id },
  });
  refresh();
};
</script>

<template>
  <div class="container">
    <h1>Three Todo</h1>
    <div class="input-container">
      <!-- <input v-model="newTodoTitle" @keyup.enter="addTodo" placeholder="Add a new todo" /> -->
      <button @click="bottomDrawerCtx.open" :disabled="uncompletedTodos.length >= 3">Add</button>
    </div>

    <div class="uncompleted-todos-container">
      <ul v-if="uncompletedTodos.length">
        <TodoItem v-for="todo in uncompletedTodos.filter(todo => !todo.isCompleted)" :key="todo.id" :todo="todo"
          @handle-update-title="updateTodoTitle" @handle-update-completed-status="updateTodoCompletedStatus"
          @handle-delete="deleteTodo" />
      </ul>
      <p v-else>nothing to do...</p>
    </div>

    <div v-if="completedTodos.length" class="completed-todos-container">
      <p>Completed todos</p>
      <ul>
        <TodoItem v-for="todo in completedTodos.filter(todo => todo.isCompleted)" :key="todo.id" :todo="todo"
          @handle-update-title="updateTodoTitle" @handle-update-completed-status="updateTodoCompletedStatus"
          @handle-delete="deleteTodo" />
      </ul>
    </div>
  </div>

  <BottomDrawer :is-opened="bottomDrawerCtx.isOpened.value" @click="bottomDrawerCtx.close">
    <button @click="addTodo">Add</button>
    <div class="input-container">
      <div>
        <input v-model="newTodoTitle" type="text" @keyup.enter="addTodo" placeholder="title" />
        <input type="number" placeholder="weight">
      </div>
      <input type="text" placeholder="description">
    </div>
  </BottomDrawer>
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
  margin-bottom: 10px;

  button {
    padding: 5px 10px;
  }
}

.uncompleted-todos-container {
  border: 3px solid salmon;
  margin-bottom: 16px;

  ul {
    margin: 0;
  }

  p {
    text-align: center;
  }
}

.completed-todos-container {
  p {
    margin: 4px;
  }

  ul {
    margin: 0;
  }
}

ul {
  list-style: none;
  padding: 0;
}
</style>