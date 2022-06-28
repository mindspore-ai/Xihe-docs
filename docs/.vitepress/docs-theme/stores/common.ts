import { defineStore } from "pinia";

interface stateTypes {
  index: number;
  itemIndex: number;
}
export const useCommonStore = defineStore("common", {
  state: (): stateTypes => ({
    index: 0,
    itemIndex: 0,
  }),
});
