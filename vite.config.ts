import { svelte } from '@sveltejs/vite-plugin-svelte'
import * as path from 'path'
import dts from 'vite-plugin-dts'
import { configDefaults, defineConfig } from 'vitest/config'

const testExclude = [
  '**/node_modules/**',
  '**/*.{js,svelte}',
  'src/wailsjs/**/*',
  '**/api/*.ts',
  '**/*.h.ts',
  '**/index.ts',
  '**/.pnpm/**',
]

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  test: {
    exclude: [...configDefaults.exclude, ...testExclude],
    include: ['src/**/__tests__/*.test.ts'],
    environment: 'jsdom',
    coverage: {
      exclude: [...testExclude],
      enabled: true,
      provider: 'v8',
      reporter: ['html'],
    },
  },
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
  resolve: {
    conditions: mode === 'test' ? ['browser'] : [],
  },
}))
