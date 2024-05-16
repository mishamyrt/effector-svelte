import { svelte } from '@sveltejs/vite-plugin-svelte'
import * as path from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      formats: ['es'],
      entry: [
        path.resolve(__dirname, 'src/gate/index.ts'),
      ],
      name: 'effector-svelte',
      fileName: (format) => `effector-svelte.${format}.js`,
    },
    rollupOptions: {
      external: ['svelte', 'effector'],
    },
    minify: 'esbuild',
    target: 'esnext',
  },
  plugins: [svelte(), dts({ rollupTypes: true })],
})
