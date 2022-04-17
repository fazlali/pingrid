import { defineStore } from 'pinia'

export const useFeedStore = defineStore({
  id: 'feed',
  state: () => ({
    pins: [],
    query: '',
    offset: 0,
    hasMore: true,
    loading: false
  }),
  getters: {
    filteredPins (state) {
      return state.pins.filter(pin => !state.query || pin.description.toLowerCase().includes(state.query.toLowerCase()))
    }
  },
  actions: {
    async loadMore() {
      if (this.hasMore) {
        this.loading = true
        const pins = await (await fetch('https://xoosha.com/ws/1/test.php?offset=' + this.pins.length, {
          headers: {
            // 'Content-Encoding': 'gzip, compress, deflate, br'
          }
        })).json()
        if (pins.length) {
          this.pins.push(...pins.map(pin => {
            Object.assign(pin, {width: 600, height: 800})
            return pin
          }))
        }
        else {
          this.hasMore = false
        }
        this.loading = false
      }
    },
    search (query) {
      this.query = query
    }
  }
})
