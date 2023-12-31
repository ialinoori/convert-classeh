import type { Config } from 'tailwindcss'

const config: Config = {
 content: ["./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: {
          DEFAULT: '1rem',
          lg: '3rem',
          xl: '4rem',
        },
  },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
