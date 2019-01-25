import {KeywordModel} from '../../models/keyword'
import {book} from '../../models/book'
const keywordModel = new KeywordModel()
const bookModel = new book()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    more: {
      type: Boolean,
      observer: '_loadMore' // 不仅支持回调function(){}，还能直接使用methods里定义的方法
    }
  },
  /**
   * 组件的生命周期
   */
  attached () {
    this.getHistory()
    this.getHot()
  },
  /**
   * 组件的初始数据
   */
  data: {
    name: '',
    history: [],
    hotWords: [],
    bookList: [],
    total: 0,
    loading: false,
    loadingCenter: false,
    searching: false,
    noResultData: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _loadMore () {
      console.log(111)
      const start = this.data.bookList.length
      const keyword = this.data.name
      if (this.data.loading || !keyword || start === this.data.total) { // 如果上次的请求未完成、没有搜索词或已请求到最后页就不执行加载更多
        return
      }
      console.log(222)
      this.getBookList(start, keyword)
    },
    onCancel () {
      this.triggerEvent('cancel')
    },
    clearInput () {
      this.setData({
        name: '',
        bookList: [],
        noResultData: false
      })
      this._closeResult()
    },
    searchHandle (e) {
      this._showLoadCenter()
      this._showResult()
      const keyword = e.detail.value || e.currentTarget.dataset.content
      this.setData({
        name: keyword,
        noResultData: false
      })
      bookModel.getBookList(0, keyword).then(res => {
        console.log(res)
        // 确保历史纪录保留有效能请求的数据
        keywordModel.addHistory(keyword)
        this.setData({
          bookList: res.books,
          total: res.total
        })
        // 更新无数据提示
        if (res.books.length === 0) {
          this.setData({
            noResultData: true
          })
        }
        this._hideLoadCenter()
      })
    },
    getHistory () {
      const words = keywordModel.getHistory()
      this.setData({
        history: words
      })
    },
    getHot () {
      const hot = keywordModel.getHot()
      hot.then(res => {
        this.setData({
          hotWords: res.hot
        })
      })
    },
    getBookList (start, keyword) {
      this.setData({
        loading: true
      })
      bookModel.getBookList(start, keyword).then(res => {
        // 判断请求完更多数据前用户有无点击clearInput操作，避免显示和操作Bug
        const books = this.data.name ? [...this.data.bookList, ...res.books] : []

        this.setData({
          bookList: books,
          loading: false
        })
        // 在_loadMore里已经判断是否有请求未完成，所以这里不用这么复杂的通知book页面请求是否完成，如果需要控制book页面其他的操作，可以使用triggerEvent
        // this.triggerEvent('loadend') // 触发自定义loadend事件，通知book页面数据加载完成
      }, () => { // 请求失败恢复loading状态
        this.setData({
          loading: false
        })
      })
    },
    onTapBook (event) {
      const bid = event.currentTarget.dataset.bid
      wx.navigateTo({
        url: '/pages/book-detail/book-detail?bid=' + bid,
      })
    },
    _showLoadCenter () {
      this.setData({
        loadingCenter: true
      })
    },
    _hideLoadCenter () {
      this.setData({
        loadingCenter: false
      })
    },
    _showResult () {
      this.setData({
        searching: true
      })
    },
    _closeResult () {
      this.setData({
        searching: false
      })
    }
  }
})
