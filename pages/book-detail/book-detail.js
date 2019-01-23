import {book} from '../../models/book';
import {LikeModel} from '../../models/like'
const bookModel = new book();
const likeModel = new LikeModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    likeStatus: false,
    comments: [],
    likeCount: 0,
    book: null,
    showMask: false,
    inputComment: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    wx.showLoading()
    const bid = options.bid;
    const detail = bookModel.getDetail(bid);
    const likeStatus = bookModel.getLikeStatus(bid);
    const comments = bookModel.getComments(bid);
    // 使用Promise.all()确保所有请求都返回数据后再hideLoading
    // Promise.all()等请求全部完成，Promise.race()有一个请求返回就进入回调
    Promise.all([detail, likeStatus, comments]).then(res => {
      this.setData({
        book: res[0],
        likeStatus: res[1].like_status,
        likeCount: res[1].fav_nums,
        comments: res[2].comments
      })
      wx.hideLoading()
    })
    /*detail.then(res => {
      this.setData({
        book: res
      })
    })
    likeStatus.then(res => {
      this.setData({
        likeStatus: res.like_status,
        likeCount: res.fav_nums
      })
    })
    comments.then(res => {
      this.setData({
        comments: res.comments
      })
    })*/
  },
  likeHandle (event) {
    const status = event.detail.status;
    likeModel.like(status, this.data.book.id, 400)
  },
  inputHandle () {
    this.setData({
      showMask: true
    })
  },
  closeCommentPanel () {
    this.setData({
      showMask: false
    })
  },
  commentInputDone (e) {
    console.log(e)
    const content = e.detail.value.trim();
    if (!content) {
      this._showToast('请输入短评内容')
      return
    } else if (content.length > 12) {
      this._showToast('短评最多12个字')
      return
    }
    this.submitComment(content)
  },
  commentTagInput (e) {
    const content = e.currentTarget.dataset.content;
    this.submitComment(content)
  },
  submitComment (content) {
    bookModel.addComment(this.data.book.id, content).then(res => {
      if (res.error_code === 0) {
        const newComment = {content: content, nums: 1}
        this.data.comments.unshift(newComment)
        this.setData({
          comments: this.data.comments
        })
        this._showToast('+1')
      }
    })
    this.closeCommentPanel()
  },
  _showToast (msg) {
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 2000
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})