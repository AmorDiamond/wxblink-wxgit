const PaginationBev = Behavior({
  data: {
    dataArray: [],
    loading: false,
    total: null,
    noResultData: false
  },
  methods: {
    setMoreData (dataArray) {
      this.setData({
        dataArray: [...this.data.dataArray, ...dataArray]
      })
    },
    getCurrentStart () {
      return this.data.dataArray.length;
    },
    setTotal (total) {
      this.data.total = total
      if (total === 0) {
        this.setData({
          noResultData: true
        })
      }
    },
    hasMore () {
      return this.data.dataArray.length >= this.data.total ? false : true
    },
    initialize () {
      this.setData({
        dataArray: [],
        loading: false,
        noResultData: false
      })
      this.data.total = null
    },
    isLocked () {
      return this.data.loading
    },
    locked () {
      this.setData({
        loading: true
      })
    },
    unlocked() {
      this.setData({
        loading: false
      })
    }
  }
})
export {
  PaginationBev
}