<script lang="ts">
export const useBottomDrawerCtx = () => {
  const isOpened = ref(false);
  const open = () => isOpened.value = true;
  // const close = () => isOpened.value = false;
  const close = () => {
    console.log('閉じる!!');
    isOpened.value = false;
  };
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
  <div class="bottom-drawer" :class="{ 'open': isOpened }">
    <div class="bottom-drawer__content">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
.bottom-drawer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 0;
  overflow: hidden;
  border: 1px solid #ccc;
  transition: height 0.3s ease-in-out;

  &.open {
    height: 50%;
  }

  &__content {
    background-color: #fff;
    height: 100%;
    padding: 20px;
    box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.2);
  }
}
</style>