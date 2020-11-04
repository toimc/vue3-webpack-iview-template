<template>
  <component
    :is="tagName"
    :class="state.classes"
    :disabled="state.itemDisabled"
    @click="handleClickLink"
    v-bind="tagProps"
  >
    <Icon class="ivu-load-loop" type="ios-loading" v-if="state.loading"></Icon>
    <Icon
      :type="state.icon"
      :custom="state.customIcon"
      v-if="(state.icon || state.customIcon) && !state.loading"
    ></Icon>
    <span v-if="state.showSlot" ref="slot"><slot></slot></span>
  </component>
</template>

<script lang="ts">
import Icon from '../icon'
import { computed, defineComponent, reactive, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const prefixCls = 'ivu-btn'

export default defineComponent({
  name: 'Button',
  components: { Icon },
  props: {
    type: {
      type: String,
      default: 'default',
      validator: (value: string) => ['default', 'primary', 'dashed', 'text', 'info', 'success', 'warning', 'error'].indexOf(value) !== -1
    },
    shape: {
      type: String,
      validator: (value: string) => ['circle', 'circle-outline'].indexOf(value) !== -1
    },
    size: {
      default: 'default',
      validator: (value: string) => ['small', 'large', 'default'].indexOf(value) !== -1
    },
    loading: Boolean,
    disabled: Boolean,
    htmlType: {
      default: 'button',
      validator: (value: string) => ['button', 'submit', 'reset'].indexOf(value) !== -1
    },
    icon: {
      type: String,
      default: ''
    },
    customIcon: {
      type: String,
      default: ''
    },
    long: {
      type: Boolean,
      default: false
    },
    ghost: {
      type: Boolean,
      default: false
    },
    // link
    to: {
      type: [Object, String],
      default: ''
    },
    replace: {
      type: Boolean,
      default: false
    },
    target: {
      type: String,
      validator: (value: string) => ['_blank', '_self', '_parent', '_top'].indexOf(value) !== -1,
      default: '_self'
    },
    append: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  setup (props, { emit, slots }) {
    const form = inject<{disabled: boolean}>('FormInstance') || ''
    const state = reactive({
      showSlot: computed(() => !!slots),
      classes: computed(() => [
        `${prefixCls}`,
        `${prefixCls}-${props.type}`,
        {
          [`${prefixCls}-long`]: props.long,
          [`${prefixCls}-${props.shape}`]: !!props.shape,
          [`${prefixCls}-${props.size}`]: props.size !== 'default',
          [`${prefixCls}-loading`]: props.loading != null && props.loading,
          [`${prefixCls}-icon-only`]: !state.showSlot && (!!props.icon || !!props.customIcon || props.loading),
          [`${prefixCls}-ghost`]: props.ghost
        }
      ]),
      itemDisabled: computed(() => {
        let state = props.disabled
        if (!state && form) state = form.disabled
        return state
      }),
      isHrefPattern: computed(() => !!props.to)
    })
    const tagName = computed(() => state.isHrefPattern ? 'a' : 'button')
    const router = useRouter()

    const linkUrl = computed(() => {
      const type = typeof props.to
      if (type !== 'string') {
        return null
      }
      if (typeof props.to === 'string' && props.to.includes('//')) {
        /* Absolute URL, we do not need to route this */
        return props.to
      }
      if (typeof props.to === 'string' && router) {
        const current = useRoute()
        const route = router.resolve(props.to + current + props.append)
        return route ? route.href : props.to
      }
      return props.to
    })

    const tagProps = computed(() => state.isHrefPattern ? { href: linkUrl.value, target: props.target } : { type: props.htmlType })

    const handleClick = (newWindow = false) => {
      const router = useRouter()

      if (newWindow) {
        let to = props.to
        if (router) {
          const current = useRoute()
          const route = router.resolve(props.to + current + props.append)
          to = route ? route.href : props.to
        }
        window.open(props.to)
      } else {
        if (router) {
          if ((typeof props.to === 'string') && props.to.includes('//')) {
            window.location.href = props.to
          } else {
            props.replace ? router.replace(props.to) : router.push(props.to)
          }
        } else {
          window.location.href = props.to
        }
      }
    }

    const handleCheckClick = (event, newWindow = false) => {
      if (props.to) {
        if (props.target === '_blank') {
          return false
        } else {
          event.preventDefault()
          handleClick(newWindow)
        }
      }
    }

    const handleClickLink = (event) => {
      emit('click', event)
      const openInNewWindow = event.ctrlKey || event.metaKey
      handleCheckClick(event, openInNewWindow)
    }

    return {
      state,
      tagName,
      tagProps,
      handleClickLink
    }
  }
})
</script>
