<script lang="ts">
export const useBottomDrawerCtx = () => {
  const isOpened = ref(false);
  const open = () => isOpened.value = true;
  const close = () => isOpened.value = false;
  return { isOpened, open, close };
};
</script>

<script setup lang="ts">
interface Props {
  isOpened: boolean;
}
interface Emits {
  (e: 'close'): void;
}
defineProps<Props>();
defineEmits<Emits>();
</script>

<template>
  <div class="overlay-container">
    <div v-if="isOpened" class="overlay" @click="$emit('close')">
      <div class="bottom-drawer overlay-content">
        <div class="bottom-drawer__header">
          <button @click="$emit('close')">Close</button>
        </div>
        <div class="bottom-drawer__content" @click.stop>
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.overlay-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: auto;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .overlay-content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    height: 50%;
  }
}

.bottom-drawer__content {
  background-color: #fff;
  height: 100%;
  padding: 20px;
}
</style>