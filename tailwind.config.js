import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'scale(1.02)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                kenburns: {
                    '0%': { transform: 'scale(1)' },
                    '100%': { transform: 'scale(1.1)' },
                },
            },
            animation: {
                fadeIn: 'fadeIn 0.35s ease-out',
                kenburns: 'kenburns 20s ease-in-out infinite alternate',
            },
            colors: {
                kumo: {
                    50: '#fff4ed',
                    100: '#ffe6d4',
                    200: '#ffc9a8',
                    300: '#ffa471',
                    400: '#ff7638',
                    500: '#f2600c',
                    600: '#ea580c',
                    700: '#c2400a',
                    800: '#9a3410',
                    900: '#7c2d10',
                    950: '#431407',
                },
            },
        },
    },

    plugins: [forms],
};
