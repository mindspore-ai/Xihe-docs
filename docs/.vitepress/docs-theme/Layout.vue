<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter, useData } from "vitepress";

import OMdBody from "../docs-theme/components/OMdBody.vue";
import AppSideBar from "../docs-theme/components/AppSideBar.vue";
import ORight from "../docs-theme/components/ORight.vue";
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";

const route = useRouter();
const data = useData().site.value.themeConfig.sidebar;

onMounted(() => {
  if (route.route.path.indexOf("/zh/") === -1) {
    if (data[0].children) {
      route.go(data[0].children[0].link);
    } else {
      route.go(data[0].link);
    }
  }
});
</script>

<template>
  <header ref="header" class="app-header">
    <AppHeader />
  </header>
  <div class="content">
    <AppSideBar />
    <main>
      <OMdBody />
    </main>
    <ORight />
  </div>
  <footer class="app-footer">
    <AppFooter />
  </footer>
</template>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-width: 1280px;
}
.app-header {
  position: fixed;
  z-index: 1000;
  height: 80px;
  left: 0;
  top: 0;
  right: 0;
  background-color: #0a1829;
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
  margin-left: 300px;
}
.content {
  // display: grid;
  // grid-template-columns: 300px minmax(454px,1040px) 246px;
  // grid-gap: 120px;
  // grid-template-areas: ". b .";
  width: 100%;
  min-width: 1280px;
  margin: 80px auto 0 auto;
  position: relative;
}
main {
  // grid-area: b;
  // justify-content: center;
  margin: 0 auto;
  width: 100%;
}
</style>
