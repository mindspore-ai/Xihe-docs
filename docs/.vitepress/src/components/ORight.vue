<script lang="ts" setup>
import { watch, ref, reactive, computed } from "vue";
import { useData, useRouter } from "vitepress";
import { useCommonStore } from "@/stores/common";
const { theme, lang } = useData();
const sidebarInfo = theme.value.sidebar;
const common = useCommonStore();
const router = useRouter();
const itemIndex = computed(() => common.itemIndex);
const index = computed(() => common.index);
function handleClick(status: number) {
  if (status === -1) {
    if (itemIndex.value > 0) {
      const link =
        "/" +
        lang.value +
        "/" +
        sidebarInfo[index.value].text +
        "/" +
        sidebarInfo[index.value].items[itemIndex.value - 1].name +
        "/";
      common.itemIndex = itemIndex.value - 1;
      router.go(link);
      return;
    }
    if (itemIndex.value === 0) {
      if (
        sidebarInfo[index.value - 1] &&
        sidebarInfo[index.value - 1].items[1]
      ) {
        const link =
          "/" +
          lang.value +
          "/" +
          sidebarInfo[index.value - 1].text +
          "/" +
          sidebarInfo[index.value - 1].items[
            sidebarInfo[index.value - 1].items.length - 1
          ].name +
          "/";
        common.index = index.value - 1;
        common.itemIndex = sidebarInfo[index.value].items.length - 1;
        router.go(link);
        return;
      } else if (
        sidebarInfo[index.value - 1] &&
        !sidebarInfo[index.value - 1].items[1]
      ) {
        const link =
          "/" + lang.value + "/" + sidebarInfo[index.value - 1].text + "/";
        router.go(link);
        common.index = common.index - 1;
        common.itemIndex = 0;
        console.log(index.value, itemIndex.value);
        return;
      } else if (!sidebarInfo[index.value - 1]) {
        console.log(common.index);
        alert("这是首页");
        return;
      }
    }
  } else {
    if (
      (itemIndex.value > 0 || itemIndex.value === 0) &&
      itemIndex.value < sidebarInfo[index.value].items.length - 1 &&
      sidebarInfo[index.value].items[itemIndex.value + 1]
    ) {
      const link =
        "/" +
        lang.value +
        "/" +
        sidebarInfo[index.value].text +
        "/" +
        sidebarInfo[index.value].items[itemIndex.value + 1].name +
        "/";
      common.itemIndex = itemIndex.value + 1;
      router.go(link);
      return;
    }
    if (
      itemIndex.value === 0 &&
      sidebarInfo[index.value + 1] &&
      !sidebarInfo[index.value].items[1]
    ) {
      const link =
        "/" +
        lang.value +
        "/" +
        sidebarInfo[index.value + 1].text +
        "/" +
        sidebarInfo[index.value + 1].items[0].name +
        "/";
      common.index = index.value + 1;
      common.itemIndex = 0;
      router.go(link);
      return;
    }
    if (
      itemIndex.value > 0 &&
      itemIndex.value === sidebarInfo[index.value].items.length - 1 &&
      sidebarInfo[index.value + 1] &&
      sidebarInfo[index.value + 1].items[0]
    ) {
      const link =
        "/" +
        lang.value +
        "/" +
        sidebarInfo[index.value + 1].text +
        "/" +
        sidebarInfo[index.value + 1].items[0].name +
        "/";
      common.index = index.value + 1;
      common.itemIndex = 0;
      router.go(link);
      return;
    }
    if (
      itemIndex.value > 0 &&
      itemIndex.value === sidebarInfo[index.value].items.length - 1 &&
      sidebarInfo[index.value + 1] &&
      !sidebarInfo[index.value + 1].items[0]
    ) {
      const link =
        "/" + lang.value + "/" + sidebarInfo[index.value + 1].text + "/";
      common.index = index.value + 1;
      common.itemIndex = 0;
      router.go(link);
      return;
    }
    if (!sidebarInfo[index.value + 1]) {
      alert("已经是最后一篇了");
    }
  }
}
</script>

<template>
  <div class="docs-sidebar">
    <div class="page-turner">
      <a @click="handleClick(-1)">上一篇</a>
      <a @click="handleClick(1)">下一篇</a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.docs-sidebar{
 position: fixed;
  right: 54px;
top: 120px;
.page-turner{
  width: 246px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
}
}

</style>
