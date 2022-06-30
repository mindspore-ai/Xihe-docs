<script lang="ts" setup>
</script>

<template>
  <aside class="sidebar">
    <slot></slot>
  </aside>
</template>

<style lang="scss" scoped>
.sidebar {
  position: fixed;
  top: 120px;
  left: 0;
  width: 300px;
  height: 100vh ;
  margin-bottom: 16px;
  padding: 0 0 30px 40px;
  background-color: #ffffff;
  border-right: 1px solid #e5e5e5;
  font-size: 14px;
  font-weight: normal;
  color: #000000;
  &-title + .sidebar-title {
    margin-top: 28px;
  }
}
</style>
