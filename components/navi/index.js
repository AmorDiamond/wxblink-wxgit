// components/navi/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    latest: Boolean,
    first: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    leftArrow: './images/triangle@left.png',
    leftDisArrow: './images/triangle.dis@left.png',
    rightArrow: './images/triangle@right.png',
    rightDisArrow: './images/triangle.dis@right.png'
  },
  attached () {
    console.log(this.data.first)
  },
  /**
   * 组件的方法列表
   */
  methods: {
    leftHandle () {
      !this.data.latest && this.triggerEvent('leftHandle', {}, {})
    },
    rightHandle () {
      !this.data.first && this.triggerEvent('rightHandle', {}, {})
    }
  }
})
