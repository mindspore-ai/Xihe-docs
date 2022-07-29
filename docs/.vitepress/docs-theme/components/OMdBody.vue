<script setup lang="ts">
import { useData } from "vitepress";
import OMdHead from "./OMdHead.vue";

// const { frontmatter } = useData();
</script>

<template>
  <div class="wrapper">
    <div class="markdown-body">
      <OMdHead />
      <Content class="layout" />
    </div>
  </div>
</template>

<style lang="scss">
.wrapper {
  margin: 0 auto;
  max-width: 1040px;
  @media (max-width: 1625px) {
    margin:0 316px;
  }
  .layout {
    min-height: calc(100vh - 80px - 240px);
  }
}
</style>
