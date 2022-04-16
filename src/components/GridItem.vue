<template>
  <div class="grid-item p-1 p-sm-2" :style="style">
    <slot />
  </div>
</template>

<script>

export default {
  name: 'GridItem',
  props: {
    position: {
      type: Object,
      default: () => ({ top: 0, left: 0, width: 0 })
    }
  },
  computed: {
    style () {
      const { top, width, left } = this.position
      return {
        transform: `translate(${left}px,${top}px)`,
        width: width + 'px'
      }
    }
  },
  mounted () {
    const vm = this
    const observer = new ResizeObserver(() => {
      vm.$emit('resize', {
        width: vm.$el.clientWidth,
        height: vm.$el.clientHeight
      })
    })
    observer.observe(this.$el)
  }
}
</script>

<style scoped lang="scss">
.grid-item {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
