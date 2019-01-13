// components/classic/epsoide/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: Number,
      observer (newVal, oldVal, changePath) {
        // ovserver里不要直接通过this.setData()处理properties里的数据，会陷入死循环
        console.log(newVal, oldVal)
        let index = newVal < 10 ? '0' + newVal : newVal
        this.setData({
          _index: index
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    year: 0,
    month: '',
    _index: ''
  },
  attached () {
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth()
    const months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '六、、十二月']
    this.setData({
      year: year,
      month: months[month]
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
