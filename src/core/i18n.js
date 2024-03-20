import config from 'config'
import i18next from 'i18next'
import Backend from 'i18next-fs-backend'
import { join } from 'node:path'
import { readdirSync, lstatSync } from 'node:fs'
import { LanguageDetector, plugin } from 'i18next-http-middleware'

import * as fsx from './fsx.js'

const basedir = fsx.dirname(import.meta, '../../i18n')

// @TODO - custom language detector & session based `accept-language`.

// @FIXME i18next::backendConnector:
//  loading namespace translation for language en failed Error:
//    ENOENT: no such file or directory, open './i18n/en/message.json'

i18next
  .use(LanguageDetector)
  .use(Backend)
  .init({
    debug: config.debug,
    initImmediate: false,
    fallbackLng: 'en-us',
    preload: readdirSync(basedir).filter((filename) => {
      const langdir = join(basedir, filename)
      return lstatSync(langdir).isDirectory()
    }),
    backend: {
      loadPath: join(basedir, '{{ lng }}/message.json'),
      addPath: join(basedir, '{{ lng }}/message.json')
    }
  })

Object.getPrototypeOf(i18next).bind = (server) => {
  server.register(plugin, { i18next })
}

export default i18next
