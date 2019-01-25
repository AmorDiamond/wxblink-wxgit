import {KeywordModel} from '../../models/keyword'
import {book} from '../../models/book'
import {PaginationBev} from "../behaviors/pagination";

const keywordModel = new KeywordModel()
const bookModel = new book()
Component({
  behaviors: [PaginationBev],
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
    loading: false,
    loadingCenter: false,
    searching: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _loadMore () {
      console.log(111)
      const start = this.getCurrentStart()
      const keyword = this.data.name
      if (this.isLocked() || !keyword || !this.hasMore()) { // 如果上次的请求未完成、没有搜索词或已请求到最后页就不执行加载更多
        return
      }
      this.getBookList(start, keyword)
    },
    onCancel () {
      this.triggerEvent('cancel')
    },
    clearInput () {
      this.setData({
        name: keyword
      })
      this.initialize()
      this._closeResult()
    },
    searchHandle (e) {
      this.initialize()
      this._showLoadCenter()
      this._showResult()
      const keyword = e.detail.value || e.currentTarget.dataset.content
      this.setData({
        name: keyword
      })
      bookModel.getBookList(0, keyword).then(res => {
        console.log(res)
        // 确保历史纪录保留有效能请求的数据
        keywordModel.addHistory(keyword)
        this.setMoreData(res.books)
        this.setTotal(res.total)
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
      this.locked()
      bookModel.getBookList(start, keyword).then(res => {
        // 判断请求完更多数据前用户有无点击clearInput操作，避免显示和操作Bug
        const books = this.data.name ? res.books : []
        this.setMoreData(books)
        this.unlocked()
        // 在_loadMore里已经判断是否有请求未完成，所以这里不用这么复杂的通知book页面请求是否完成，如果需要控制book页面其他的操作，可以使用triggerEvent
        // this.triggerEvent('loadend') // 触发自定义loadend事件，通知book页面数据加载完成
      }, () => { // 请求失败恢复loading状态
        this.unlocked()
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
