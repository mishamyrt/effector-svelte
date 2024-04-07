import { svelte } from '@sveltejs/vite-plugin-svelte'
import * as path from 'path'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      $features: resolve(__dirname, './src/features'),
      $shared: resolve(__dirname, './src/shared'),
      $entities: resolve(__dirname, './src/entities'),
      $widgets: resolve(__dirname, './src/widgets'),
      $pages: resolve(__dirname, './src/pages'),
      '$wails/runtime': resolve(__dirname, './src/wailsjs/runtime/runtime'),
      '$wails/go': resolve(__dirname, './src/wailsjs/go')
    }
  },
  build: {
    lib: {
      formats: ['es'],
      entry: [
        path.resolve(__dirname, 'src/gate/index.ts')
      ],
      name: 'effector-svelte',
      fileName: (format) => `effector-svelte.${format}.js`
    },
    rollupOptions: {
      external: ['svelte', 'effector']
    },
    minify: 'esbuild',
    target: 'esnext'
  },
  plugins: [svelte(), dts({ rollupTypes: true })]
})
