<script lang="ts" setup>
import { computed, onMounted, ref, watch } from "vue";
import { useData, useRouter } from "vitepress";
import { useCommonStore } from "@/stores/common";
const common = useCommonStore();
const itemIndex = computed(() => common.itemIndex);
const index = computed(() => common.index);
const router = useRouter();
const data = useData().site.value.themeConfig.sidebar;
console.log(data[0].text);
const breadText1 = ref("");
const breadText2 = ref("");

watch(
  router.route,
  () => {
    breadText1.value = data[index.value].text;
    if (data[index.value].items[0]) {
      breadText2.value = data[index.value].items[itemIndex.value].name;
    } else {
      breadText2.value = "";
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="markdown-body-title">
    <div class="bread-crumbs">
      <span>{{ breadText1 }}</span>
      <span>></span>
      <span>{{ breadText2 }}</span>
    </div>
    <div class="grade"></div>
  </div>
</template>

<style lang="scss" scoped>
.markdown-body-title {
  margin-bottom: 40px;
  border-bottom: 1px solid var(--theme-cross-line);
  padding-bottom: 24px;
  .page-title {
    font-size: 36px;
    line-height: 48px;
    margin: 0;
    font-weight: 500;
  }
  .info {
    color: var(--theme-text);
    font-size: 12px;
    margin-top: 20px;
    .line {
      margin: 0 16px;
    }
    .author {
      margin-left: 0;
    }
    .tag {
      display: inline-block;
      color: var(--theme-text);
      line-height: 20px;
      padding: 0 8px;
      border: 1px solid var(--theme-text);
      margin-right: 4px;
    }
  }
}
@media (max-width: 1100px) {
  .markdown-body-title {
    margin-bottom: 24px;
    .page-title {
      font-size: 16px;
      line-height: 24px;
    }
  }
}
</style>
