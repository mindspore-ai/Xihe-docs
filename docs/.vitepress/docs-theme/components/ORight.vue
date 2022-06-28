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
const isShow = computed(() => {
  if (itemIndex.value === 0 && index.value === 0) {
    return 1;
  }
  if (index.value === sidebarInfo.length - 1) {
    if (!sidebarInfo[index.value].children) {
      return 2;
    } else if (
      sidebarInfo[index.value].children &&
      itemIndex.value === sidebarInfo[index.value].children.length - 1
    ) {
      return 2;
    }
  } else {
    return 0;
  }
});
function handleClick(status: number) {
  if (status === -1) {
    if (itemIndex.value > 0) {
      const link = sidebarInfo[index.value].children[itemIndex.value - 1].link;
      common.itemIndex = itemIndex.value - 1;
      router.go(link);
      return;
    }
    if (itemIndex.value === 0) {
      if (
        sidebarInfo[index.value - 1] &&
        sidebarInfo[index.value - 1].children
      ) {
        const link =
          sidebarInfo[index.value - 1].children[
            sidebarInfo[index.value - 1].children.length - 1
          ].link;
        common.index = index.value - 1;
        common.itemIndex = sidebarInfo[index.value].children.length - 1;
        router.go(link);
        return;
      } else if (
        sidebarInfo[index.value - 1] &&
        !sidebarInfo[index.value - 1].children
      ) {
        const link = sidebarInfo[index.value - 1].link;
        router.go(link);
        common.index = common.index - 1;
        common.itemIndex = 0;
        return;
      } else if (!sidebarInfo[index.value - 1]) {
        // 已经是第一页了
        // console.log(common.index);
        return;
      }
    }
  } else {
    if (
      sidebarInfo[index.value].children &&
      sidebarInfo[index.value].children[itemIndex.value + 1]
    ) {
      const link = sidebarInfo[index.value].children[itemIndex.value + 1].link;
      common.itemIndex = itemIndex.value + 1;
      router.go(link);
      return;
    }
    if (
      sidebarInfo[index.value].children &&
      !sidebarInfo[index.value].children[itemIndex.value + 1] &&
      sidebarInfo[index.value + 1] &&
      sidebarInfo[index.value + 1].link
    ) {
      const link = sidebarInfo[index.value + 1].link;
      common.itemIndex = 0;
      common.index = index.value + 1;
      router.go(link);
      return;
    }
    if (
      sidebarInfo[index.value].children &&
      !sidebarInfo[index.value].children[itemIndex.value + 1] &&
      sidebarInfo[index.value + 1] &&
      !sidebarInfo[index.value + 1].link &&
      sidebarInfo[index.value + 1].children
    ) {
      const link = sidebarInfo[index.value + 1].children[0].link;
      common.itemIndex = 0;
      common.index = index.value + 1;
      router.go(link);
      return;
    }
    if (
      sidebarInfo[index.value].link &&
      !sidebarInfo[index.value + 1].link &&
      sidebarInfo[index.value + 1].children
    ) {
      const link = sidebarInfo[index.value + 1].children[0].link;
      common.itemIndex = 0;
      common.index = index.value + 1;
      router.go(link);
      return;
    }
    if (sidebarInfo[index.value].link && sidebarInfo[index.value + 1].link) {
      const link = sidebarInfo[index.value + 1].link;
      common.itemIndex = 0;
      common.index = index.value + 1;
      router.go(link);
      return;
    } else if (!sidebarInfo[index.value + 1]) {
      // 已经是最后一页了
    }
  }
}
</script>

<template>
  <div class="docs-sidebar">
    <div class="page-turner">
      <a @click="handleClick(-1)" :class="isShow===1?'no-click':''">上一篇</a>
      <a @click="handleClick(1)" :class="isShow===2?'no-click':''">下一篇</a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-turner {
  position: fixed;
  right: 54px;
  top: 120px;
  width: 246px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  a {
    cursor: pointer;
    display: flex;
    align-items: center;
    &:nth-of-type(1)::before {
      content: "";
      display: inline-block;
      border-left: 5px solid transparent;
      border-right: 5px solid #000000;
      border-top: 5px solid transparent;
      border-bottom: 5px solid transparent;
      margin-right: 8px;
    }
    &:nth-of-type(2)::after {
      content: "";
      display: inline-block;
      border-left: 5px solid #000000;
      border-right: 5px solid transparent;
      border-top: 5px solid transparent;
      border-bottom: 5px solid transparent;
      margin-left: 8px;
    }
  }
  .no-click{
    cursor: auto;
  }
  @media screen  and (max-width: 1279px){
    position: absolute;
    top:40px;
  }
}
</style>
