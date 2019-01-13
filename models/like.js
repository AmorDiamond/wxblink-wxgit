import { HTTP } from "../utils/http"
class LikeModel extends HTTP {
  like (status, artId, category) {
    const url = status ? '/like' : '/like/cancel';
    this.request({
      url: url,
      method: 'post',
      data: {art_id: artId, type: category},
      success: (res) => {
        console.log('like', res)
        this._showError(res.msg)
      }
    })
  }
  _showError (msg) {
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 2000
    })
  }
}
export { LikeModel }