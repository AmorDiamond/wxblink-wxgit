import { HTTP } from "../utils/http-promise";

class book extends HTTP {
  getHotList () {
    return this.request({
      url: '/book/hot_list'
    })
  }
  getDetail (bid) {
    return this.request({
      url: `/book/${bid}/detail`
    })
  }
  getLikeStatus(bid) {
    return this.request({
      url: `/book/${bid}/favor`
    })
  }
  getComments(bid) {
    return this.request({
      url: `/book/${bid}/short_comment`
    })
  }
  addComment (bid, content) {
    return this.request({
      url: `/book/add/short_comment`,
      method: 'post',
      data: {
        book_id: bid,
        content: content
      }
    })
  }
}

export { book }