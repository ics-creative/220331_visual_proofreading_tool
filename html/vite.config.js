const { resolve } = require("path");

export default {
  build: {
    outDir: "docs",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "about/index.html"),
        works: resolve(__dirname, "works/index.html"),
      },
    },
  },
  base: "/",
  preview: {
    port: 8080
  }
};
