<template>
  <div ref="grid" class="feed-grid" style="overflow-x:hidden;">
    <div
      class="grid-container position-relative mx-auto overflow-hidden"
      :style="{height: gridHeight + 'px', width: gridWidth + 'px'}"
    >
      <grid-item
        v-for="(item, index) in items"
        :key="`feed-grid-item-${item.id}`"
        :position="itemBoundings[index]"
        @resize="size => updateItemSize(index, size)"
      >
        <slot name="item" :item="item" :index="index" :row="rowFromIndex(index)" />
      </grid-item>
    </div>
  </div>
</template>

<script>


import GridItem from '@/components/GridItem.vue'
import SortedArray from '@/types/sorted-array'
export default {
  name: 'Grid2',
  components: { GridItem },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    fluidHeight: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      itemsSize: [],
      gridWrapperWidth: 5000
    }
  },
  computed: {
    // maxColWidth () {
    //   if (this.gridWrapperWidth <= 540) {
    //     return 150
    //   }
    //   if (this.gridWrapperWidth <= 720) {
    //     return 200
    //   }
    //   return 240
    // },
    cols () {
      if (this.gridWrapperWidth < 400) {
        return 2
      }
      return Math.floor(this.gridWrapperWidth / 200)
    },
    colWidth () {
      return this.gridWrapperWidth < 400 ? this.gridWrapperWidth / this.cols : 200
    },
    gridHeight () {
      return this.itemBoundings.length ? Math.max(...this.itemBoundings.map(b => b.top + b.height)): 0
    },
    gridWidth () {
      return this.cols * this.colWidth
    },
    itemBoundings () {
      const candidates = new SortedArray((a, b) => {
        return (a.top - b.top) || (a.left - b.left) || 0
      })
      for (let col = 0; col < this.cols; col++) {
        candidates.insert({
          top: 0,
          left: col * this.colWidth
        })
      }
      return this.items.map((item, index) => {
        const position = candidates.shift()
        const itemSize = this.itemsSize[index] || {
          width: item.width,
          height: item.height + (item.title ? 100 : 0)
        }
        const height = Math.ceil((this.colWidth / itemSize.width) * itemSize.height)
        candidates.insert({
          left: position.left,
          top: position.top + height
        })
        Object.assign(position, {
          width: this.colWidth,
          height
        })
        return position
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      const vm = this
      const observer = new ResizeObserver(() => {
        if (vm.$refs.grid) {
          vm.gridWrapperWidth = vm.$refs.grid.clientWidth
        }
      })
      observer.observe(vm.$refs.grid)
    })
    this.gridWrapperWidth = this.$refs.grid.clientWidth
  },
  methods: {
    updateItemSize: (() => {
      let timeout = null
      let changes = {}
      return function (index, size) {
        const self = this
        changes[index] = size
        if (timeout) {
          clearTimeout(timeout)
        }
        timeout = setTimeout(() => {
          for (const [index, size] of Object.entries(changes)) {
            self.itemsSize.splice(index, 1, size)
          }
          changes = {}
        }, 30)
      }
    })(),
    rowFromIndex (index) {
      return Math.floor(index / this.cols)
    }
  }
}
</script>

<style lang="scss">
.feed-grid {
  .grid-container.static {
    width: 100% !important;
    @media (max-width: 399px) {
      > :first-child {
        width: 50% !important;
      }
      > :nth-child(2) {
        width: 50% !important;
        transform: translate(-100%, 0) !important;
      }
      > :nth-child(n+3) {
        visibility: hidden;
        transform: none !important;
      }
    }
    @for $i from 3 through 25 {
      @media (min-width: #{($i - 1) * 200 + 20}px) and (max-width: #{$i * 200 - 1 + 20}px) {
        width: #{($i - 1) * 200}px !important;
        > :nth-child(n+#{$i}) {
          visibility: hidden;
          transform: none !important;
        }
      }
    }
  }
}
</style>
