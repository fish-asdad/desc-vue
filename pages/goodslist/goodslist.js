// pages/goodslist/goodslist.js
let app = getApp()
let {
  requestApi
} = require("../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsListDatas: []
  },
  async getGoodsList(cat_id, min, max) {
    let result = await requestApi(app.globalData.base_url + "/catalog/goodslist", {
      cat_id: cat_id,
      warehouse_id: 0,
      area_id: 0,
      min: min,
      max: max,
      goods_num: 0,
      size: 10,
      page: 1,
      sort: "goods_id",
      order: "desc",
      self: 0,
    },"post")
    console.log(result);

    this.setData({
      goodsListDatas:result.data.data
    })
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.getGoodsList(options.cat_id,"","")
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