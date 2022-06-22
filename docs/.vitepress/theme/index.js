import "../src/shared/styles/base.scss";
import "../src/shared/styles/md.scss";
import Layout from "../src/App.vue";
import OMdHead from "../src/components/OMdHead.vue";
import { createPinia } from "pinia";
export default {
  Layout,
  enhanceApp({ app, router, siteData }) {
    if (typeof global !== "undefined") {
      global.window = {};
    }
    app.use(createPinia());
    app.component("OMdHead", OMdHead);
  },
};
