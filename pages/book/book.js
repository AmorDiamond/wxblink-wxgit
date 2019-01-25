import { book } from "../../models/book";
const bookModel = new book()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookList: [],
    searching: false,
    more: false,
    lock: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    bookModel.getHotList().then(res=>{
      this.setData({
        bookList: res
      })
    })
  },
  onTapBook (event) {
    const bid = event.currentTarget.dataset.bid
    wx.navigateTo({
      url: '/pages/book-detail/book-detail?bid=' + bid,
    })
  },
  onTapSearch () {
    this.setData({
      searching: true
    })
  },
  onSearchCancel (event) {
    this.setData({
      searching: false
    })
  },
  loadMoreEnd () { // search组件请求完数据触发
    this.setData({
      lock: false
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom () {
    // 是否可以执行请求已由search组件判断
    /*if (this.data.lock) { // 判断search组件是否已经请求完上次的数据
      return
    }*/
    if (this.data.searching) { // 处于搜索组件时才执行操作
      this.setData({
        more: !this.data.more // 控制more变化，search组件的properties才能触发observer
      })
    }
  }
})