import config from 'config'
import { readdirSync, lstatSync } from 'node:fs'
import i18next from 'i18next'
import Backend from 'i18next-fs-backend'
import { LanguageDetector, plugin } from 'i18next-http-middleware'

import * as fsx from './fsx.js'

// @TODO - custom language detector & session based `accept-language`.
// @FIXME i18next::backendConnector:
//  loading namespace translation for language en failed Error:
//    ENOENT: no such file or directory, open './i18n/en/message.json'
const basedir = fsx.dirname(import.meta, '../../i18n')

i18next
  .use(Backend)
  .use(LanguageDetector)
  .init({
    debug: config.debug,
    initImmediate: false,
    lng: 'en-us',
    ns: 'message',
    defaultNS: 'message',
    fallbackLng: 'en-us',
    preload: readdirSync(basedir).filter((filename) => {
      const langdir = fsx.join(basedir, filename)
      return lstatSync(langdir).isDirectory()
    }),
    backend: {
      loadPath: fsx.join(basedir, '{{ lng }}/{{ ns }}.json')
    }
  })

Object.getPrototypeOf(i18next).bind = (server) => {
  server.register(plugin, { i18next })
}

export default i18next
