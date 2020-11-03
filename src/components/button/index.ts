import Button from './button.vue'
import ButtonGroup from './button-group.vue'
import { App } from 'vue'

Button.Group = ButtonGroup

Button.install = function (app: App) {
  app.component(Button.name, Button)
  app.component(ButtonGroup.name, ButtonGroup)
  return app
}

export default Button as typeof Button &
  Plugin & {
    readonly Group: typeof ButtonGroup;
  }

export { Button, ButtonGroup }
