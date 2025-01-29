/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            transitionProperty: {
                'height-width-opacity-display':
                    'height, width, opacity, display',
                'filter-width': 'filter, width'
            },
            willChange: {
                'transform-opacity': 'transform, opacity'
            },
            keyframes: {
                slideIn: {
                    '0%': { transform: 'translateX(100%)' },
                    '100%': { transform: 'translateX(0%)' }
                }
            },
            animation: {
                slideIn: 'slideIn .5s ease-in-out'
            },
            boxShadow: {
                'inner-lg': 'rgba(0, 0, 0, 1) 1px 1px 40px 0px inset'
            }
        }
    },
    plugins: []
};
