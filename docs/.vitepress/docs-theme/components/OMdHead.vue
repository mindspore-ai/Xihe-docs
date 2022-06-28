<script lang="ts" setup>
import { computed, onMounted, ref, watch } from "vue";
import { useData, useRouter } from "vitepress";
import { useCommonStore } from "@/stores/common";
const common = useCommonStore();
const itemIndex = computed(() => common.itemIndex);
const index = computed(() => common.index);
const router = useRouter();
const data = useData().site.value.themeConfig.sidebar;
const breadText1 = ref("");
const breadText2 = ref("");
const isShow = computed(() => {
  return breadText2.value !== "";
});
watch(
  router.route,
  () => {
    breadText1.value = data[index.value].text;
    if (data[index.value].children) {
      breadText2.value = data[index.value].children[itemIndex.value].text;
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
      <span class="crumbs-one">{{ breadText1 }}</span>
      <span v-if="isShow" class="lgt">></span>
      <span v-if="isShow" class="crumbs-two">{{ breadText2 }}</span>
    </div>
    <div class="grade"></div>
  </div>
</template>

<style lang="scss" scoped>
.markdown-body-title {
  border-bottom: 1px solid var(--theme-cross-line);
  .bread-crumbs {
    .crumbs-one {
      color: rgba(85, 85, 85, 1);
    }
    .lgt {
      margin: 0 5px;
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
