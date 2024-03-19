import { join } from 'node:path'
import config from 'config'
import i18next from 'i18next'
import Backend from 'i18next-fs-backend'
import { LanguageDetector, plugin } from 'i18next-http-middleware'

import * as fsx from './fsx.js'

const locales = fsx.dirname(import.meta, '../../locales')

i18next
  .use(LanguageDetector)
  .use(Backend)
  .init({
    debug: config.debug,
    initImmediate: false,
    fallbackLng: 'en-us',
    preload: ['en-us', 'zh-cn'],
    backend: {
      loadPath: join(locales, '{{ lng }}/message.json')
    }
  })

export const bind = (server) => {
  server.register(plugin, { i18next })
}

export default i18next
