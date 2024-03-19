import config from 'config'
import i18next from 'i18next'
import Backend from 'i18next-fs-backend'
import { join } from 'node:path'
import { readdirSync, lstatSync } from 'node:fs'
import { LanguageDetector, plugin } from 'i18next-http-middleware'

import * as fsx from './fsx.js'

const locales = fsx.dirname(import.meta, '../../locales')

i18next
  .use(LanguageDetector)
  .use(Backend)
  .init({
    debug: config.debug,
    initImmediate: false,
    fallbackLng: 'en',
    preload: readdirSync(locales).filter((fileName) => {
      const langdir = join(locales, fileName)
      console.log('=================================')
      console.log(`Lang dir: ${langdir}`)
      return lstatSync(langdir).isDirectory()
    }),
    backend: {
      loadPath: join(locales, '{{ lng }}/message.json'),
      addPath: join(locales, '{{ lng }}/message.json')
    }
  })

export const bind = (server) => {
  server.register(plugin, { i18next })
}

export default i18next
