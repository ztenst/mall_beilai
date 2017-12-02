// 获取全局应用程序实例对象
// const app = getApp()
// const bmap = require('../../utils/bmap-wx')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'map_navigator',
    imgbg: 'http://oqnqsweek.bkt.clouddn.com/image/mapbg.jpg',
    text: '设置目标地点',
    btnType: 'default'
  },
  openMap () {
    let that = this
    if (!wx.getStorageSync('address')) {
      that.setData({
        btnType: 'warn'
      })
      return wx.showModal({
        title: '未选取目的地',
        content: '小主，您还没有选取目标地点哦',
        showCancel: false
      })
    }
    var latitude = wx.getStorageSync('latitude')
    var longitude = wx.getStorageSync('longitude')
    wx.openLocation({
      latitude: latitude,
      longitude: longitude,
      scale: 16,
      name: '目标地点',
      address: wx.getStorageSync('address')
    })
  },
  openMapChooseSite () {
    let that = this
    wx.chooseLocation({
      success (res) {
        // console.log(res)
        wx.setStorageSync('latitude', res.latitude)
        wx.setStorageSync('longitude', res.longitude)
        wx.setStorageSync('address', res.address)
        that.setData({
          btnType: 'primary',
          text: '已设置目标地点'
        })
      }
    })
  },

})
