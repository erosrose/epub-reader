import { defineConfig, type PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import tsconfigPaths from 'vite-tsconfig-paths'
import { visualizer } from 'rollup-plugin-visualizer'

// https://cn.vitejs.dev/
export default defineConfig({
  base: '/',
  plugins: [
    vue(),
    vueJsx({}),
    tsconfigPaths({
      root: __dirname,
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      dts: 'types/auto-import.d.ts',
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dts: 'types/components.d.ts',
    }),
    visualizer() as PluginOption,
  ],
  publicDir: 'public',
  resolve: {
    extensions: ['.ts', '.js'],
    alias: [
      { find: '@', replacement: resolve(__dirname, 'src') },
      { find: 'comps', replacement: resolve(__dirname, 'src/components') },
    ],
  },
  optimizeDeps: {
    exclude: ['vue-demi'],
  },
  server: {
    host: '0.0.0.0', // 监听所有网络接口
    port: 8025,
  },
})
