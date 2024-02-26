import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  globalSetup: './vitest.setup.js',
  test: {
    watch: false,
    exclude: [...configDefaults.exclude],
    reporters: 'verbose',
  },
})
