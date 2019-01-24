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
    total: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _loadMore () {
      console.log(111)
      const start = this.data.bookList.length
      const keyword = this.data.name
      if (!keyword || start === this.data.total) { // 如果没有搜索词或已请求到最后页就不执行加载更多
        return
      }
      this.getBookList(start, keyword)
    },
    onCancel () {
      this.triggerEvent('cancel')
    },
    clearInput () {
      this.setData({
        name: '',
        bookList: []
      })
    },
    searchHandle (e) {
      const keyword = e.detail.value || e.currentTarget.dataset.content
      bookModel.getBookList(0, keyword).then(res => {
        console.log(res)
        // 确保历史纪录保留有效能请求的数据
        keywordModel.addHistory(keyword)
        this.setData({
          name: keyword,
          bookList: res.books,
          total: res.total
        })
      })
    },
    onTagSearch (e) {
      const keyword = e.currentTarget.dataset.content
      this.setData({
        name: keyword
      })
      this.getBookList(0, keyword)
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
      bookModel.getBookList(start, keyword).then(res => {
        // 确保历史纪录保留有效能请求的数据
        // keywordModel.addHistory(keyword)
        this.setData({
          bookList: [...this.data.bookList, ...res.books]
        })
        this.triggerEvent('loadend') // 触发自定义loadend事件，通知book页面数据加载完成
      })
    }
  }
})
