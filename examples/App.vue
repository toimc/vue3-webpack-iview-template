<template>
  <div>
    <div>hello world</div>
    <Button>Default</Button>
    <Button type="primary">Primary</Button>
    <Button type="dashed">Dashed</Button>
    <Button type="text">Text</Button>
    <br /><br />
    <Button type="info">Info</Button>
    <Button type="success">Success</Button>
    <Button type="warning">Warning</Button>
    <Button type="error">Error</Button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Button } from '@/components/button'

export default defineComponent({
  name: 'App',
  components: {
    Button
  }
})
</script>

<style lang="less">
@import '../src/styles/index.less';
</style>
