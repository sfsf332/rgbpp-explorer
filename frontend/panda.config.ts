import { defineConfig, defineGlobalStyles } from '@pandacss/dev'
import { createPreset } from '@park-ui/panda-preset'

import { button } from '@/configs/ui-preset/button'
import { hoverCard } from '@/configs/ui-preset/hover-card'
import { iconButton } from '@/configs/ui-preset/icon-button'
import { numberInput } from '@/configs/ui-preset/number-input'
import { pagination } from '@/configs/ui-preset/pagination'
import { popover } from '@/configs/ui-preset/popover'
import { skeleton } from '@/configs/ui-preset/skeleton'
import { table } from '@/configs/ui-preset/table'
import { tabs } from '@/configs/ui-preset/tabs'
import { tooltip } from '@/configs/ui-preset/tooltip'

const globalCss = defineGlobalStyles({
  body: {
    color: 'text.primary',
    background: 'bg.default',
    '--colors-bg-default': 'var(--colors-bg-primary)',
    minW: '360px',
    fontFamily: 'var(--font-montserrat)',
    fontWeight: 'medium',
    minH: '100svh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
})

export default defineConfig({
  jsxFramework: 'react',
  preflight: true,
  presets: [
    '@pandacss/preset-base',
    createPreset({
      accentColor: 'blue',
      grayColor: 'slate',
      borderRadius: 'sm',
    }),
  ],
  include: ['./src/**/*.{js,jsx,ts,tsx}', './app/**/*.{js,jsx,ts,tsx}'],
  exclude: [],
  theme: {
    extend: {
      keyframes: {
        'steps-x': {
          '0%': {
            transform: 'translateX(0)',
          },
          '100%': {
            transform: 'translateX(var(--steps-offset-x))',
          },
        },
        'pulse': {
          '0%, 100%': {
            opacity: 1,
          },
          '50%': {
            opacity: 0.5,
          },
        },
      },
      recipes: {
        button,
        iconButton,
        skeleton,
      },
      slotRecipes: {
        table,
        tooltip,
        pagination,
        tabs,
        hoverCard,
        popover,
        numberInput,
      },
      tokens: {
        sizes: {
          content: {
            value: '1280px',
          },
        },
        colors: {
          brand: {
            value: '#3483FF',
            a10: {
              value: 'rgba(52,131,255,0.1)',
            },
          },
          danger: {
            value: '#FF4144',
            a10: {
              value: 'rgba(255,65,68,0.1)',
            },
          },
          warning: {
            value: '#FF8744',
            a10: {
              value: 'rgba(255,135,68,0.1)',
            },
          },
          success: {
            value: '#0FF082',
            a10: {
              value: 'rgba(15,240,130,0.1)',
            },
            unspent: {
              value: '#14E17D',
            },
          },
          border: {
            primary: {
              value: '#272A42',
            },
            light: {
              value: '#4C546D',
            },
          },
          text: {
            primary: {
              value: '#fff',
            },
            secondary: {
              value: '#cecece',
            },
            third: {
              value: '#9A9CA6',
            },
            disabled: {
              value: 'rgba(255, 255, 255, 0.6)',
            },
            link: {
              value: '#319CFF',
            },
          },
          bg: {
            primary: {
              value: '#11131F',
            },
            card: {
              value: '#1D1F31',
              hover: {
                value: '#181A29',
              },
            },
            input: {
              value: '#292C44',
            },
            tooltip: {
              value: '#292C44',
            },
            skeleton: {
              value: '#292C44',
            },
            tabActive: {
              value: '#007bff'
            }
          },
        },
      },
      
    },
  
  },
  outdir: 'styled-system',
  globalCss,
})
