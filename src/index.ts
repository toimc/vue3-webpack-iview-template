import { App } from 'vue'

import version from './version'

import { Icon } from './components/icon'

const components = [
  Icon
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
  Icon
}

export default {
  version,
  install
}
