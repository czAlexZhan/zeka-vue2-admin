import vue from '@vitejs/plugin-vue2'
import legacy from '@vitejs/plugin-legacy'
import envParser from 'vite-plugin-env-parser'

import { setupHtmlPlugin } from './html'
import { setupUnocss } from './unocss'
import { setupUnoPlugin } from './unoPlugin'

export const setupVitePlugins = (viteEnv, isBuild, buildTime) => {
  const { VITE_USE_LEGACY, VITE_MSP_VERSION } = viteEnv

  const vitePlugins = [
    vue(),
    envParser({}),
    // unocss 配置
    setupUnocss(viteEnv),
    ...setupUnoPlugin(viteEnv),
  ]

  if (isBuild) {
    // 生产环境兼容不支持ESM浏览器以及内置babel
    VITE_USE_LEGACY &&
      vitePlugins.push(
        legacy({
          targets: ['defaults', 'not IE 11'],
        })
      )
    vitePlugins.push(setupHtmlPlugin(buildTime, VITE_MSP_VERSION))
  }

  return vitePlugins
}
