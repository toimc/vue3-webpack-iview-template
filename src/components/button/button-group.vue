<template>
  <div :class="state.classes">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive } from 'vue'

const prefixCls = 'ivu-btn-group'

export default defineComponent({
  name: 'ButtonGroup',
  props: {
    size: {
      validator: (value: string) => {
        return ['small', 'large', 'default'].indexOf(value) !== -1
      },
      default: 'default'
    },
    shape: {
      validator: (value: string) => ['circle', 'circle-outline'].indexOf(value) !== -1
    },
    vertical: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const state = reactive({
      classes: computed(() => [
        `${prefixCls}`,
        {
          [`${prefixCls}-${props.size}`]: !!props.size,
          [`${prefixCls}-${props.shape}`]: !!props.shape,
          [`${prefixCls}-vertical`]: props.vertical
        }
      ])
    })
    return {
      state
    }
  }
})
</script>
