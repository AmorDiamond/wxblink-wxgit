import {HTTP} from "../utils/http-promise";

class KeywordModel extends HTTP {
  key = 'q'
  maxLength = 10
  getHistory () {
    const words = wx.getStorageSync(this.key)
    return words ? words : []
  }
  getHot () {
    const url = '/book/hot_keyword'
    return this.request({
      url
    })
  }
  addHistory (keyword) {
    const words = this.getHistory()
    const has = words.includes(keyword)
    if (!has) {
      if (words.length >= this.maxLength) {
        words.pop()
      }
      words.unshift(keyword)
      wx.setStorageSync(this.key, words)
    }
  }
}
export {KeywordModel}