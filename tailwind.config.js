/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    safelist: [
        "bg-gradient-to-r",
        "from-purple-500",
        "via-pink-500",
        "to-red-500",
        "from-yellow-500",
        "from-green-500",
        "via-green-600",
        "to-green-700",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}