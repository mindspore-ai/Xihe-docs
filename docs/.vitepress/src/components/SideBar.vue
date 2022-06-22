<script lang="ts" setup>
import { useData } from "vitepress";
const data = useData().site.value.themeConfig.sidebar;
</script>

<template>
  <aside class="sidebar">
    <slot></slot>
  </aside>
</template>

<style lang="scss" scoped>
.sidebar {
  // position: fixed;
  // top: 120px;
  width: 300px;
  margin-bottom: 16px;
  padding: 30px 40px;
  bottom: 0;
  left: 0;
  background-color: #ffffff;
  border-right: 1px solid #e5e5e5;
  font-size: 14px;
  font-weight: normal;
  color: #000000;
@media screen and (min-width: 1384px){
  // position: absolute;
}
  &-title + .sidebar-title {
    margin-top: 28px;
  }
}
</style>
