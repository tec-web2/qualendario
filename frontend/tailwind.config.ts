import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    backgroundImage:{
      'img-login': "url('/assets/bg-login.png')",
      'onFocus': "url('/assets/onFocus.png')",
    },
    screens:{
      '2xl': '1537px',
    },
    extend: {
      colors:{
        'violet': '#310273',
        'baby-blue': '#35f2f2',
        'lime': '#04d960',
        'yellow': '#f2bb13',
        'orange': '#f28627',
        'gray': '#d9d9d9',
      },
    },
  },
  plugins: [],
};
export default config;
