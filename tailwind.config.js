// tailwind.config.js
import flowbite from 'flowbite/plugin';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        oscuro: "#4A8294",
        medio: "#49ACBF",
        claro: "#6DD6E3",
        blanco: "#FFFFFF",
        grisclaro: "#F4F5F5",
      },
    },
  },
  plugins: [
    flowbite,
  ],
};
