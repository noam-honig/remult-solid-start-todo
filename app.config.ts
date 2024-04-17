import { defineConfig } from "@solidjs/start/config"

export default defineConfig({
  //@ts-ignore
  solid: {
    babel: {
      plugins: [["@babel/plugin-proposal-decorators", { version: "2023-11" }]],
    },
  },
})
