/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      popUpFont: [
        "1rem",
        {
          fontWeight: "500",
          lineHeight: 0,
        },
      ],
    },
    extend: {
      boxShadow: {
        basicShadow: "1px 1px 5px  rgba(0, 0, 0, 0.3)",
      },
      colors: {
        default: "#fff",
        secondDefault: "#000",
        logIn: "#c2410c",
        registration: "#15803d",
        logOut: "#b91c1c",
        formButton: "#3b82f6",
        error: "#ef4444",
        basicBox: "#fff",
        basicBg: "#f3f4f6",
        success: "#22c55e",
      },
    },
  },
  plugins: [],
};
