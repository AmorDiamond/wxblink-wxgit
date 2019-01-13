import { HTTP } from "../utils/http-promise";

class book extends HTTP {
  getHotList () {
    return this.request({
      url: '/book/hot_list'
    })
  }
}

export { book }