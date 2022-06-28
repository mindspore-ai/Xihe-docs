<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { useRouter, useData } from "vitepress";
import { useCommonStore } from "@/stores/common";
import IconArrow from "./IconArrow.vue";
// import { useCommonStore } from '@/stores/common';
const { lang } = useData();
const props = defineProps({
  info: {
    type: Object,
    default: () => {
      return {};
    },
  },
  activeId: {
    type: String,
    default: "",
  },
  index: {
    type: Number,
    default: NaN,
  },
});
const isOpen = ref(true);
const common = useCommonStore();
const isShow = ref(true);
const router = useRouter();
const path = computed(() => {
  return router.route.path;
});
// 判断菜单是否为激活状态
const isActive = computed(() => {
  if (props.info.children) {
    isShow.value = true;
    return props.info.children.some((item: any) => {
      return item.link === path.value;
    });
  } else {
    isShow.value = false;
    return props.info.link === path.value;
  }
});
const emit = defineEmits(["item-click"]);

const toggleVisible = (flag: boolean | undefined, item: any, index: number) => {
  if (flag === undefined) {
    isOpen.value = !isOpen.value;
  } else {
    isOpen.value = flag;
  }
  if (item.link) {
    router.go(item.link);
    common.index = index;
    common.itemIndex = 0;
  }
};

const onClick = (
  id: string,
  link: string,
  index: number,
  itemIndex: number
) => {
  emit("item-click", id, link, index, itemIndex);
};

const beforeEnter = (el: HTMLUListElement) => {
  el.style.height = "0px";
};
const enter = (el: HTMLUListElement) => {
  const height = el.scrollHeight;
  el.style.height = `${height}px`;
};
const beforeLeave = (el: HTMLUListElement) => {
  el.style.height = `${el.offsetHeight}px`;
};
const leave = (el: HTMLUListElement) => {
  el.style.height = "0px";
};
onMounted(() => {
  common.index = 0;
  common.itemIndex = 0;
});
</script>

<template>
  <div class="sidebar-menu">
    <div
      class="menu-title"
      @click="toggleVisible(!isOpen, info, index)"
      :class="{ open: isOpen, active: isActive }"
    >
      {{ info.text }}
      <IconArrow v-if="isShow" class="menu-title-icon" />
    </div>
    <transition
      name="menu"
      @before-enter="beforeEnter"
      @enter="enter"
      @before-leave="beforeLeave"
      @leave="leave"
    >
      <ul class="menu-list" v-show="isOpen">
        <li
          class="menu-item"
          :class="{ active: item.link === path }"
          v-for="(item, itemIndex) in info.children"
          @click="onClick(item.text, item.link, index, itemIndex)"
        >
          {{ item.text }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.sidebar-menu {
  .menu-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    padding: 0 12px 0 20px;
    cursor: pointer;

    &-icon {
      font-size: 12px;
      transform: rotate(0);
      transition: 0.3s transform cubic-bezier(0.645, 0.045, 0.355, 1);
    }

    &:hover {
      color: var(--theme-color);
    }

    &.active {
      color: var(--theme-color);
    }

    &.open {
      .menu-title-icon {
        transform: rotate(90deg);
      }
    }
  }

  .menu-list {
    overflow-y: hidden;
    transition: 0.3s height cubic-bezier(0.645, 0.045, 0.355, 1);
    .menu-item {
      display: flex;
      align-items: center;
      height: 40px;
      padding: 0 20px 0 36px;
      cursor: pointer;

      & + .menu-item {
        margin-top: 8px;
      }

      &:hover {
        background-color: var(--bg-color);
        color: var(--theme-color);
      }

      &.active {
        background-color: var(--bg-color);
        color: var(--theme-color);
      }
    }
  }
}
</style>
