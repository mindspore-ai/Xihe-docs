<script lang="ts" setup></script>

<template>
  <aside class="sidebar">
    <slot></slot>
  </aside>
</template>

<style lang="scss" scoped>
.sidebar {
  position: fixed;
  top: 80px;
  left: 0;
  width: 300px;
  height: calc(100vh - 80px);
  margin-bottom: 16px;
  padding: 0 0 30px 40px;
  background-color: #ffffff;
  border-right: 1px solid #e5e5e5;
  font-size: 14px;
  font-weight: normal;
  color: #000000;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: #d8d8d8;
    background-clip: content-box;
  }

  &::-webkit-scrollbar-track {
    border-radius: 3px;
    box-shadow: inset 0 0 2px rgba($color: #000000, $alpha: 0.2);
    background: #ffffff;
  }
  &-title + .sidebar-title {
    margin-top: 28px;
  }
}
</style>
