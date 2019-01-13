import { Classic } from '../../models/classic.js'
import { LikeModel } from "../../models/like";

const classicModel = new Classic();
const likeModel = new LikeModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classicData: '',
    latest: true,
    first: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classicModel.getLatest((res) => {
      console.log('classic',res);
      this.setData({
        classicData: res
      })
    })
  },
  likeHandle: function (event) {
    const status = event.detail.status
    console.log(status)
    likeModel.like(status, this.data.classicData.id, this.data.classicData.type)
  },
  leftHandle (e) {
    console.log(e)
    this._updateClassic(true)
  },
  rightHandle (e) {
    console.log(e)
    this._updateClassic(false)
  },
  _updateClassic (next) {
    const flag = next ? true : false;
    classicModel.getNextPrivious(flag, this.data.classicData.index, (res) => {
      this.setData({
        classicData: res,
        first: classicModel.isFirst(res.index),
        latest: classicModel.isLast(res.index)
      })
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