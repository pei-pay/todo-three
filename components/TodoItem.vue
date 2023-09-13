<script setup lang="ts">
import { Todo } from '~/entity/todo';

interface Props {
  todo: Todo;
}
interface Emits {
  (e: 'handleUpdateTitle', id: number, title: string): void,
  (e: 'handleUpdateCompletedStatus', id: number, isCompleted: boolean): void;
  (e: 'handleDelete', id: number): void;
}
const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const isUpdating = ref(false);
const updatingTitle = ref(props.todo.title);

const handleUpdateSave = () => {
  emit('handleUpdateTitle', props.todo.id, updatingTitle.value);
  isUpdating.value = false;
};
const handleUpdateReset = () => {
  updatingTitle.value = props.todo.title;
  isUpdating.value = false;
};
</script>

<template>
  <li class="todo-item">
    <input type="checkbox" :checked="todo.isCompleted"
      @change="$emit('handleUpdateCompletedStatus', todo.id, !todo.isCompleted)">
    <input v-if="isUpdating" v-model="updatingTitle" type="text" @keyup.enter="handleUpdateSave"
      @blur="handleUpdateReset">
    <span v-else :class="{ completed: todo.isCompleted }" @click="isUpdating = true">
      {{ todo.title }}
    </span>
    <button @click="$emit('handleDelete', todo.id)">Delete</button>
  </li>
</template>

<style lang="scss">
li.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ccc;
  padding: 4px;

  input[type="checkbox"] {
    margin-right: 4px;
  }

  input[type="text"] {
    border: none;
    width: 100%;
    padding: 4px;
  }

  span {
    width: 100%;

    &.completed {
      text-decoration: line-through;
    }
  }

  button {
    margin-left: 4px;
    background-color: red;
    color: white;
  }
}
</style>