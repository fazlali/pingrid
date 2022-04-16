class SortedArray extends Array {
  constructor (compare) {
    super()
    this.compare = compare || ((a, b) => a - b)
  }

  insert (element) {
    const findIndex = (from, to) => {
      if (to === from) {
        return from
      }
      const index = Math.floor((to + from) / 2)
      const compare = this.compare(this[index], element)
      if (compare > 0) {
        return findIndex(from, index)
      }
      if (compare < 0) {
        return findIndex(index + 1, to)
      }
      return index
    }
    this.splice(findIndex(0, this.length), 0, element)
  }
}

export default SortedArray
