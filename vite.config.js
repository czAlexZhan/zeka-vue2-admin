import { resolve } from 'node:path'
import { URL, fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import autoprefixer from 'autoprefixer'
import { parse } from 'vite-plugin-env-parser'
import { setupVitePlugins } from './build/plugins'
import { createViteProxy } from './build/proxy'
import { getBuildTime } from './build/config/time'

export default defineConfig(({ mode }) => {
  const isBuild = mode === 'production'
  const envDir = resolve(__dirname, 'env')
  const viteEnv = parse(loadEnv(mode, envDir))
  const { VITE_PORT, VITE_PUBLIC_PATH } = viteEnv
  const buildTime = getBuildTime()

  return {
    envDir,
    base: VITE_PUBLIC_PATH,
    plugins: setupVitePlugins(viteEnv, isBuild, buildTime),
    resolve: {
      alias: {
        '~': fileURLToPath(new URL('./', import.meta.url)),
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@c': fileURLToPath(new URL('./src/components', import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "./src/styles/scss/global.scss" as *;`,
        },
      },
      postcss: {
        plugins: [autoprefixer()],
      },
    },
    define: {
      BUILD_TIME: JSON.stringify(buildTime),
    },
    server: {
      port: VITE_PORT,
      host: true,
      open: false,
      proxy: createViteProxy(),
    },
    build: {
      reportCompressedSize: false,
      sourcemap: viteEnv.VITE_SOURCE_MAP === 'Y',
      commonjsOptions: {
        ignoreTryCatch: false,
      },
    },
  }
})
