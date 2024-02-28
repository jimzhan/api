import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  globalSetup: './vitest.setup.js',
  test: {
    watch: false,
    include: ['./src/**/*.spec.js'],
    exclude: [...configDefaults.exclude],
    coverage: {
      enabled: true,
      provider: 'istanbul',
      include: ['src/**'],
      reporter: ['text', 'json', 'html']
    }
  }
})
