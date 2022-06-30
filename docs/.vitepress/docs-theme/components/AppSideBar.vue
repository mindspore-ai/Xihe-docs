<script setup lang="ts">
import { watch, ref, onMounted } from "vue";
import { useData, useRouter, useRoute } from "vitepress";

import { useCommonStore } from "@/stores/common";

import SideBar from "./SideBar.vue";
import SideBarMenu from "./SideBarMenu.vue";

const { theme } = useData();

const common = useCommonStore();
const router = useRouter();
const route = useRoute();

const path = route.path;

const routeName = path.split("/")[2];
const sidebarInfo = theme.value.sidebar;

const activeLinkId = ref(routeName);
const goLink = ref("");
const handleItemClick = (
  name: string,
  link: string,
  index: number,
  itemIndex: number
) => {
  activeLinkId.value = name;
  goLink.value = link;
  common.index = index;
  common.itemIndex = itemIndex;
  router.go(link);
};
onMounted(() => {
  sidebarInfo.forEach((item: any, index: number) => {
    if (item.children) {
      item.children.forEach((itemChildren: any, indexChildren: number) => {
        if (path === itemChildren.link) {
          common.index = index;
          common.itemIndex = indexChildren;
        }
      });
    } else {
      if (path === item.link) {
        common.index = index;
        common.itemIndex = 0;
      }
    }
  });
});
</script>

<template>
  <SideBar>
    <side-bar-menu
      v-for="(item, index) in sidebarInfo"
      :info="item"
      :index="index"
      :active-id="activeLinkId"
      @item-click="handleItemClick"
    ></side-bar-menu>
  </SideBar>
</template>

<style lang="scss" scoped>
main {
  display: flex;
  justify-content: center;
  margin-top: 40px;
  margin-left: 260px;
}
</style>
