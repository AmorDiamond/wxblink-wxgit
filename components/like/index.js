// pages/components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like: {
      type: Boolean
    },
    count: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    likeImg: './images/like@2x.png',
    unlikeImg: './images/unlike@2x.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeLike: function () {
      const likeNum = this.properties.like ? --this.properties.count : ++this.properties.count;
      console.log(likeNum)
      console.log(this.data.like)
      this.setData({
        like: !this.properties.like,
        count: likeNum
      })
      const likeStatus = {
        status: this.data.like
      }
      this.triggerEvent('like', likeStatus, {})
    }
  }
})
