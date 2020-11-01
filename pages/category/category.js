// pages/swiper-demo/swiper-demo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      tabNavDatas: [{
          id: 1,
          title: "首页"
      }, {
          id: 2,
          title: "家用电器"
      }, {
          id: 3,
          title: "男装女装"
      }, {
          id: 4,
          title: "鞋靴箱包"
      }, {
          id: 5,
          title: "手机数码"
      }, {
          id: 6,
          title: "电脑办公"
      }, {
          id: 7,
          title: "家具家访"
      }],
      currentIndex: 1,
      oLeft: 0,
      widH: 0
  },
changeTab(e){
  console.log(e.detail.current);
  if(e.detail.current>=2&&e.detail.current<6){
    this.setData({
      oLeft:(e.detail.current - 2)*75
    })
  }
  this.setData({
    currentIndex:e.detail.current
  })
},
changeSwiper(e){
  console.log(e.currentTarget.dataset.current);
  this.setData({
    currentIndex:e.currentTarget.dataset.current
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
     wx.getSystemInfo({
       success: (result) => {
         this.setData({
           widH:result.windowHeight
         })
       },
     })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})