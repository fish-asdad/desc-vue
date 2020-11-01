// pages/swiper-demo/swiper-demo.js
const app=getApp()
let{
  requestApi
}=require("../../../utils/request.js")
// {}解构赋值。按需引入
console.log(requestApi);

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    params: {
      showBack: false,
      showSearch: true,
      showTitle: true,
      bg: 0,
      title: "正弘城+"
    },
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
    }, {
      id: 8,
      title: "个人化妆"
    }],
    tipHidden: false,
    winH: 0,
    page: 1,
    bestListDatas: [],
    currentIndex: 0,
    oLeft: 0,
    widH:0,
  },
  closeTip() {
    console.log(123);
    wx.setStorageSync('tip', true) //设置一个本地存储
    this.setData({
      tipHidden: true
    })
  },
  //滚动页面
  scrollPage(e) {
    // console.log(e.detail.scrollTop);
    let bgAlpha = e.detail.scrollTop / 64 * 0.8
    // console.log(bgAlpha);
    this.setData({
      "params.bg": bgAlpha
    })
  },
  getHomeBestList(page){
    requestApi(app.globalData.base_url+"/goods/type_list",{
      page:page,
      size:10,
      type:"is_best"
    }).then(res=>{
      console.log(res);
      this.setData({
        bestListDatas:this.data.bestListDatas.concat(res.data.data)
      })
    })
  },
  loadMore(){
    console.log(123456);
     this.setData({
      page:++this.data.page
    }) 
    console.log(123456);
    this.getHomeBestList(this.data.page)
    
  },
  //横条tab切换
  changeTab(e) {
    console.log(e.detail.current);
    if (e.detail.current >= 2 && e.detail.current < 6) {
      this.setData({
        oLeft: (e.detail.current - 2) * 75
      })
    }
    this.setData({
      currentIndex: e.detail.current
    })
  },
  changeSwiper(e) {
    console.log(e.currentTarget.dataset.current);
    this.setData({
      currentIndex: e.currentTarget.dataset.current
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    wx.getSystemInfo({
      success: (result) => {
        this.setData({
          widH: result.windowHeight
        })
      },
    })
    if (wx.getStorageSync('tip')) { // //获取tip的本地存储的tip
      this.setData({
        tipHidden: true
      })
    }

    // 设置首页scroll-view的高度
    this.setData({
      winH: app.globalData.windowHeight
    })

    this. getHomeBestList(this.data.page)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})