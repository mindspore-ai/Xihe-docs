<script lang="ts" setup>
import { computed, ref, watch } from "vue";
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
const itemPath = computed(() => {
  return router.route.path.split("/")[router.route.path.split("/").length - 2];
});
const isActive = computed(() => {
  if (props.info.items[0]) {
    isShow.value = true;
    return props.info.items.some((item: any) => {
      return item.name === itemPath.value;
    });
  } else {
    isShow.value = false;
    return props.info.text === itemPath.value;
  }
});
const emit = defineEmits(["item-click"]);

const toggleVisible = (
  flag: boolean | undefined,
  item: string,
  index: number
) => {
  console.log(12);

  if (flag === undefined) {
    isOpen.value = !isOpen.value;
  } else {
    isOpen.value = flag;
  }
  if (!isShow.value) {
    router.go("/" + lang.value + "/" + item + "/");
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
</script>

<template>
  <div class="sidebar-menu">
    <div
      class="menu-title"
      @click="toggleVisible(!isOpen, info.text, index)"
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
          :class="{ active: itemPath === item.name }"
          v-for="(item, itemIndex) in info.items"
          @click="
            onClick(item.name, info.text + '/' + item.name, index, itemIndex)
          "
        >
          {{ item.name }}
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
      color: #40ADFF;
    }

    &.active {
      color: #40ADFF;
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
        background-color: #e6e8ef;
        color: #40ADFF;
      }

      &.active {
        background-color: #e6e8ef;
        color: #40ADFF;
      }
    }
  }
}
</style>
