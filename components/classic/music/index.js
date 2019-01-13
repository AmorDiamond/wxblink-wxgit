// components/classic/music/index.js
const mMgr = wx.getBackgroundAudioManager();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    img: String,
    src: String,
    content: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    playImg: './images/player@play.png',
    pauseImg: './images/player@pause.png'
  },
  attached () {
    this._recoverStatus()
    this._monitorSwitch()
  },
  detached () {
    // mMgr.stop() // 组件注销就停止音乐
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onPlay () {
      console.log(11)
      if (!this.data.playing) {
        this.setData({
          playing: true
        })
        mMgr.title = this.data.src;
        mMgr.src = this.data.src;
      } else {
        this.setData({
          playing: false
        })
        mMgr.pause()
      }
    },
    _recoverStatus () {
      console.log(mMgr)
      if (mMgr.paused) {
        this.setData({
          playing: false
        })
        return
      }
      if (mMgr.src === this.data.src) {
        this.setData({
          playing: true
        })
      }
    },
    _monitorSwitch() {
      mMgr.onPlay(() => {
        this._recoverStatus()
      })
      mMgr.onPause(() => {
        this._recoverStatus()
      })
      mMgr.onStop(() => {
        this._recoverStatus()
      })
      mMgr.onEnded(() => {
        this._recoverStatus()
      })
    }
  }
})
