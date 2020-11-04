/* eslint-disable import/no-named-default */
import { App } from 'vue'

import version from './version'

import { default as Icon } from './components/icon'

import { default as Button } from './components/button'

const components = [
  Icon,
  Button
]

const install = function (app: App) {
  components.forEach(component => {
    app.use(component as typeof component & { install: () => void })
  })

  return app
}

export {
  version,
  install,
  Icon,
  Button
}

export default {
  version,
  install
}
