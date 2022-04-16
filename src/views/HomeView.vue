<script setup>
import Grid2 from '@/components/Grid2.vue'
import Pin from '@/components/Pin.vue'
import Loading from '@/components/Loading.vue'
import { useFeedStore } from "../stores/feed";

import { onUnmounted, onMounted, nextTick } from 'vue'

const feed = useFeedStore()

const onScroll = () => {
  const scrollTop = document.scrollingElement.scrollTop
  const scrollHeight = document.scrollingElement.scrollHeight
  const clientHeight = document.scrollingElement.clientHeight
  const scrollBottom = scrollHeight - clientHeight - scrollTop
  const bottom = Math.floor(100 * scrollBottom / clientHeight)
  if (bottom < 50) {
    loadMore()
  }
}

const loadMore = async () => {
  if (!feed.loading){
    await feed.loadMore()
    nextTick(() => {
      onScroll()
    })
  }
}

onMounted(() => {
  document.addEventListener('scroll', onScroll)
  onScroll()
})
onUnmounted(() => {
  document.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <div class="container-fluid">
    <grid2 :items="feed.filteredPins">
      <template #item="{item}">
        <pin :pin="item"/>
      </template>
    </grid2>
    <loading v-if="feed.loading" class="my-3" />
  </div>

</template>
