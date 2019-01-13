import { config } from '../config.js'
const _errorCode = {
  1: '抱歉，出现错误！',
  1000: '输入参数错误',
  1001: '输入的json格式不正确',
  1002: '找不到资源',
  1003: '未知错误',
  1004: '禁止访问',
  1005: '不正确的开发者key',
  1006: '服务器内部错误',
  2000: '你已经点过赞了',
  2001: '你还没点过赞',
  3000: '该期内容不存在',
  400: '请求包含不支持的参数',
  401: '未授权',
  403: '被禁止访问',
  404: '请求的资源不存在',
  413: '上传的File体积太大',
  500: '内部错误'
};
class HTTP {
  request ({url, data={}, method='GET'}) {
    return  new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method)
    })
  }
  _request (url, resolve, reject, data, method) {
    const requestUrl = config.api_base_url + url;
    wx.request({
      url: requestUrl,
      method: method,
      data: data,
      header: {
        appkey: config.appkey
      },
      success: (res) => {
        console.log(res)
        let code = res.statusCode.toString();
        if (code.startsWith(2)) {
          resolve(res.data);
        } else {
          reject()
          this._showError(res.statusCode)
        }
      },
      fail: (err) => {
        reject()
        this._showError(1)
      }
    })
  };
  _showError (errorCode) {
    wx.showToast({
      title: _errorCode[errorCode] ? _errorCode[errorCode] : _errorCode[1],
      icon: 'none',
      duration: 2000
    })
  }
}
export {
  HTTP
}