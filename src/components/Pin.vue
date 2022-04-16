<template>
  <div class="pin pin-teaser">
    <a
        :href="pin.url"
        target="_blank"
        class="mb-2 d-block position-relative"
        rel="nofollow"
    >
      <div class="position-absolute top-0 end-0 px-2 bg-black text-white m-2 rounded-pill fs-6 bg-opacity-50">{{pin.tag}}</div>
            <div
              v-if="pin.price"
              class="position-absolute top-0 start-0 bg-opacity-75 bg-white pt-1 px-2 m-1 small fw-bold rounded-pill shadow-sm"
            >
              {{ pin.price  }}
            </div>
      <!--      <div-->
      <!--        v-if="pin.post.type === 'video'"-->
      <!--        class="position-absolute top-0 start-0 bg-opacity-75 bg-white pt-1 px-2 m-1 small fw-bold rounded-pill shadow-sm"-->
      <!--      >-->
      <!--        {{ pin.post.media.video.duration / 1000 | time | persian_number }}-->
      <!--      </div>-->
      <img
          :key="pin.image_url"
          ref="image"
          class="w-100 rounded-2 h-auto"
          :height="pin.height"
          :width="pin.width"
          :src="pin.image_url"
          :style="{'background-color': '#eeeeee'}"
      >
      <div class="position-absolute top-0 start-0 w-100 h-100 bg-opacity-10 bg-secondary rounded-2" />
<!--      <span v-if="$isFirstPage()" class="btn btn-danger position-absolute bottom-0 end-0 rounded-3 m-2 m-md-3">مشاهده</span>-->
    </a>
    <!--    <div v-if="pin.annotations.length" class="position-relative">-->
    <!--      <div class="annotations text-nowrap overflow-auto small">-->
    <!--        <nuxt-link-->
    <!--          v-for="board in pin.annotations"-->
    <!--          :key="`pin-${pin.id}-annotation-${board.id}`"-->
    <!--          :to="{name: 'boards-id-slug', params: {id: board.id, slug: board.slug}, _: {source: {page_name: source.page_name, section: 'pin_annotations'}}}"-->
    <!--          class="bg-light rounded-pill py-0 px-2 d-inline-block me-1"-->
    <!--          @click.native="$store.commit('boards/SET_BOARD', board)"-->
    <!--        >-->
    <!--          {{ board.title }}-->
    <!--        </nuxt-link>-->
    <!--      </div>-->
    <!--      <i class="fader" />-->
    <!--    </div>-->
    <a
        href="#"
        rel="nofollow"
    >
      <div class="h6 fw-bold pin-title overflow-hidden my-1">
        {{ pin.name }}
      </div>
    </a>
  </div>
</template>

<script>

export default {
  name: 'Pin',
  props: {
    pin: Object,
  },
  computed: {
    imageHeight () {
      const imageRenderWidth = this.$refs.image.offsetWidth
      return (imageRenderWidth * this.height) / this.width
    }
  },
}
</script>

<style lang="scss">
.pin.pin-teaser {
  .pin-title {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    min-height: 2.4em;
  }
  .annotations{
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
    &+.fader{
      position: absolute;
      top: 0;
      right: 0;
      background-image: linear-gradient(
              90deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0)) !important;
      height: 100%;
      width: 50px;
    }
  }
}
</style>
