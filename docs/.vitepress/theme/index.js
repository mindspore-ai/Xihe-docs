import Theme from '../docs-theme'
import { createPinia } from "pinia";
export default {
  ...Theme,
  enhanceApp({ app, router, siteData }) {
    if (typeof global !== "undefined") {
      global.window = {};
    }
    app.use(createPinia());
  },
};
