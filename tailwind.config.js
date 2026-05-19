/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
                display: ['Caveat', 'cursive'],
            },
            colors: {
                'brand-green': '#2a6b3c',
                'brand-green-muted': '#3d7a50',
                'brand-blue': '#1b4f8a',
            },
            keyframes: {
                fadeSlideUp: {
                    '0%': { opacity: '0', transform: 'translateY(14px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
            animation: {
                'fade-slide-up': 'fadeSlideUp 0.22s ease both',
            },
        },
    },
    plugins: [],
}
