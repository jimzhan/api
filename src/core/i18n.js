import config from 'config'
import { readdirSync, lstatSync } from 'node:fs'
import i18next from 'i18next'
import Backend from 'i18next-fs-backend'
import { LanguageDetector, plugin } from 'i18next-http-middleware'

import * as fsx from './fsx.js'

const basedir = fsx.dirname(import.meta, '../../locales')

i18next
  .use(Backend)
  .use(LanguageDetector)
  .init({
    debug: config.debug,
    initImmediate: false,
    ns: 'message',
    defaultNS: 'message',
    fallbackLng: 'en',
    preload: readdirSync(basedir).filter((filename) => {
      const langdir = fsx.join(basedir, filename)
      return lstatSync(langdir).isDirectory()
    }),
    backend: {
      loadPath: fsx.join(basedir, '{{ lng }}/{{ ns }}.json')
    },
    detection: {
      order: ['header', 'cookie', 'session'],
      ignoreCase: true,
      lookupCookie: 'lang',
      lookupSession: 'lang',
      lookupHeader: 'accept-language'
    }
  })

Object.getPrototypeOf(i18next).bind = (server) => {
  server.register(plugin, { i18next })
}

export default i18next
