<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue';
import { useRouter, useData } from 'vitepress';

import OMdBody from '../src/components/OMdBody.vue';
import SideBar from '../src/components/AppDoc.vue';
import ORight from '../src/components/ORight.vue';
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';

import { useCommonStore } from '../src/stores/common';

// const data = useData();
// console.log(data.site.value.themeConfig.sidebar);
</script>

<template>
  <header ref="header" class="app-header">
    <app-header></app-header>
  </header>
  <div class="content">
    <SideBar />
    <main>
      <OMdBody />
    </main>
    <ORight />
  </div>
  <footer class="app-footer">
    <app-footer></app-footer>
  </footer>
</template>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #F0F2F5;
}
.app-header {
  position: fixed;
  z-index: 1000;
  height: 80px;
  left: 0;
  top: 0;
  right: 0;
  background-color: #0A1829;
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  min-width: 1280px;
}

.app-body {
  min-width: 1280px;
  min-height: calc(100vh - 80px);
}

.app-footer {
  position: relative;
  min-width: 1280px;
  background-color: #18191d;
  z-index: 10;
}
.content {
  display: flex;
  max-width:1472px;
  margin: 80px auto 0 auto;
}
main {
  display: flex;
  justify-content: center;
  margin-left: 140px;
}
</style>
