import { HTTP } from '../utils/http.js'
class Classic extends HTTP {
  getLatest (sucCallback) {
    this.request({
      url: '/classic/latest',
      success: (res) => {
        sucCallback(res);
        this._setLatestIndex(res.index)
      }
    })
  }
  getNextPrivious (next, index, sucCallback) {
    const url = next ? '/classic/' + index + '/next' : '/classic/' + index + '/previous';
    this.request({
      url: url,
      success: (res) => {
        sucCallback(res)
      }
    })
  }
  isFirst (index) {
    return index === 1 ? true : false;
  }
  isLast (index) {
    const latest = this._getLatestIndex()
    return index === latest ? true : false
  }
  _setLatestIndex(index) {
    wx.setStorageSync('latest', index)
  }
  _getLatestIndex () {
    return wx.getStorageSync('latest')
  }
}
export { Classic }