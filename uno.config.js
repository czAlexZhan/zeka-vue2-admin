import { defineConfig } from '@unocss/vite'
import transformerDirectives from '@unocss/transformer-directives'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import presetUno from '@unocss/preset-uno'
import presetMspVue2Admin from '@msp/uno-preset'
import presetAttributify from '@unocss/preset-attributify'
import { themeVars } from './src/theme/vars.js'

export default defineConfig({
  content: {
    pipeline: {
      exclude: ['node_modules', 'dist'],
    },
  },
  theme: {
    ...themeVars,
    fontSize: {
      'icon-xs': '0.875rem',
      'icon-small': '1rem',
      icon: '1.125rem',
      'icon-large': '1.5rem',
      'icon-xl': '2rem',
    },
  },
  shortcuts: {
    'card-wrapper': 'rd-8px shadow-sm',
  },
  transformers: [transformerDirectives(), transformerVariantGroup()],
  presets: [presetUno({ dark: 'class' }), presetAttributify(), presetMspVue2Admin()],
})
