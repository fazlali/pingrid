<script setup>
import Grid2 from '@/components/Grid2.vue'
import Pin from '@/components/Pin.vue'
import Loading from '@/components/Loading.vue'
import { useFeedStore } from "../stores/feed";

import { onUnmounted, onMounted, nextTick } from 'vue'
import { onBeforeRouteUpdate, onBeforeRouteLeave, useRoute } from 'vue-router'
const route = useRoute()
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
      setTimeout(onScroll, 500)
    })
  }
}

onMounted(() => {
  document.addEventListener('scroll', onScroll)
  feed.search(route.query.q || '')
  onScroll()
})
onUnmounted(() => {
  document.removeEventListener('scroll', onScroll)
})

onBeforeRouteUpdate((to, from, next) => {
  feed.search(to.query.q || '')
  nextTick(onScroll)
  next()
})
onBeforeRouteLeave((to, from, next) => {
  feed.search('')
  next()
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
