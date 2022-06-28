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
  margin-bottom: 16px;
  padding: 30px 40px;
  background-color: #ffffff;
  border-right: 1px solid #e5e5e5;
  font-size: 14px;
  font-weight: normal;
  color: #000000;
// @media screen and (max-width: 1705px){
//   position: static;
//   margin-top: 40px;
// }
  &-title + .sidebar-title {
    margin-top: 28px;
  }
}
</style>
