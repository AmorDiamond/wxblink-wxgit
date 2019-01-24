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
  loadMoreEnd () {
    this.setData({
      lock: false
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom () {
    if (this.data.lock) {
      return
    }
    this.setData({
      lock: true,
      more: !this.data.more // 控制more变化，search组件的properties才能触发observer
    })
  }
})