/** @type {import('tailwindcss').Config} */
export default {
  // content: ["./**/*.{html,js,vue}"],
  content: ["app.vue"],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms")({
    strategy: 'base', // only generate global styles
  })
],
}

