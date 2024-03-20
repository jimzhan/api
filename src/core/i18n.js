import config from 'config'
import { readdirSync, lstatSync } from 'node:fs'
import i18next from 'i18next'
import Backend from 'i18next-fs-backend'
import { LanguageDetector, plugin } from 'i18next-http-middleware'

import * as fsx from './fsx.js'

const basedir = fsx.dirname(import.meta, '../../i18n')

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
      // order and from where user language should be detected.
      order: ['cookie', 'session', 'header'],
      ignoreCase: true,
      // keys or params to lookup language from
      lookupCookie: 'lang',
      lookupHeader: 'accept-language',
      lookupHeaderRegex: /(([a-z]{2})-?([A-Z]{2})?)\s*;?\s*(q=([0-9.]+))?/gi,
      lookupSession: 'lang'
    }
  })

Object.getPrototypeOf(i18next).bind = (server) => {
  server.register(plugin, { i18next })
}

export default i18next
