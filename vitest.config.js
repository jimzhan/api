import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    watch: false,
    exclude: [...configDefaults.exclude],
    reporters: 'verbose',
  },
})
