<script setup lang="ts">
import { useData } from 'vitepress';
import OMdHead from './OMdHead.vue';

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
.markdown-body{
  width:1040px;
}
.layout {
  min-height: calc(100vh - 80px - 240px);
  @media (max-width: 1100px) {
    min-height: calc(100vh - 48px - 200px);
  }
}
</style>
