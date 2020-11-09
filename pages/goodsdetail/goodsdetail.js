// pages/goodsdetail/goodsdetail.js
let app = getApp()
let {
  requestApi
} = require("../../utils/request.js")
let wxParse = require("../../wxParse/wxParse.js")
Page({
  data: {
    goodsDetailData: {},
    navH: 0,
    opacity: 0,
    goId: "detail0",
    showMask: false,
    height: 0,
    goodsDetailTJData:[],
    goodsPJData:[],
    topArr:[],
    heightArr:[],
    titleArr:["商品","详情","推荐","评论"],
    activeIndex:0,
    flag:false,
    buyNum:1,
    gid:0
  },
  goBackFn() {
    wx.navigateBack()
  },
  showMaskFn() {
    //定义一个动画实例对象
    let animationObj = wx.createAnimation({
      delay: 0, //延迟动画
      duration: 300, //持续时间
      timingFunction: "linear" //过度效果
    })


    animationObj.translateY(280).step()

    setTimeout(() => {
      animationObj.translateY(0).step()
      this.setData({
        animationData: animationObj.export(), //到处动画
        showMask: true
      })
    }, 200)

    this.setData({
      animationData: animationObj.export(), //到处动画
      showMask: true
    })
  },
  closeMaskFn() {
    this.setData({
      showMask: false

    })
  },
  async getGoodsDetail(goods_id) {
    let goodsDetail = await requestApi(app.globalData.base_url + "/goods/show", {
      goods_id: goods_id,
      warehouse_id: 0,
      area_id: 0,
      is_delete: 0,
      is_on_sale: 1,
      is_alone_sale: 1
    }, "post")
    console.log(goodsDetail);
    this.setData({
      goodsDetailData: goodsDetail.data.data
    })
    wxParse.wxParse('content', 'html', goodsDetail.data.data.goods_desc, this, 5);
    // this.infoScrollFn()
  },
  //商品推荐
  async getGoodsTJ(goods_id) {
    let goodsDetail = await requestApi(app.globalData.base_url + "/goods/goodsguess", {
      page: 1,
      size: 10
    }, "post")
    console.log(goodsDetail);
    this.setData({
      goodsDetailTJData: goodsDetail.data.data
    })
    // this.infoScrollFn()
  },
  // 商品评价
  async getGoodsPJ(goods_id) {
    let goodsPJ = await requestApi(app.globalData.base_url + "/comment/goods", {
      goods_id: goods_id,
      rank: "all",
      page: 1,
      size: 10
    }, "post")
    console.log(goodsPJ.data.data);
    this.setData({
      goodsPJData: goodsPJ.data.data
    })
    
  },

  scrollFn(e){
    console.log(e.detail.scrollTop);
    var scrollY=e.detail.scrollTop
    var opacity=scrollY/200
    opacity=opacity>1?1:opacity
    this.setData({
      opacity:opacity
    })
    console.log(this.data.topArr);
    console.log(this.data.heightArr);
    if(this.data.flag){
      this.setData({
        flag:false
      })
      return;
    }
    for(var i=0;i<this.data.topArr.length;i++){
      if(scrollY<this.data.topArr[i]-app.globalData.navbarHeight/2+this.data.heightArr[i]){
        this.setData({
          activeIndex:i
        })
        break;
      }
    }

  },
  infoScrollFn(){
    var topArr=[]
    var heightArr=[]
    for(var i=0;i<4;i++){
      var idDetail="#detail"+i
      const query = wx.createSelectorQuery()
      query.select(idDetail).boundingClientRect()
      query.exec((res)=>{
        var top=res[0].top       // #the-id节点的上边界坐标
        var height=res[0].height
        
        topArr.push(top)
        heightArr.push(height)
        console.log(topArr);
        console.log(heightArr);
        this.setData({
          topArr:topArr,
          heightArr:heightArr
        })
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.goods_id);
    this.getGoodsDetail(options.goods_id)
    this.getGoodsPJ(options.goods_id) 
    this.getGoodsTJ()
    this.setData({
      gid:options.goods_id,
      navH: app.globalData.navbarHeight,
      height: app.globalData.windowHeight
    })

    wx.showLoading({
      title: '加载中',
    })
    
    setTimeout( ()=> {
      this.infoScrollFn()
      wx.hideLoading()
    }, 5000)
  },
  tapNavFn(e){  //点击头部按钮
    let index=e.currentTarget.dataset.index
    let id=e.currentTarget.dataset.id
    console.log(index);
    console.log(id);
    this.setData({
      goId:id,
      flag:true,
      activeIndex:index
    })  
  },
  changeNum(e){  //修改蒙版商品数字
    console.log(e.currentTarget.dataset.num);
    if(e.currentTarget.dataset.num==0){
      if(this.data.buyNum<=1){
        this.setData({
          buyNum:1
        })
      }else{
        this.setData({
          buyNum:this.data.buyNum-1
        })
      }
    }else{
      this.setData({
        buyNum:this.data.buyNum+1
      })
    }
  },
  //点击蒙版中的确定
  addCartOk(){
    // console.log(this.data.goodsDetailData);
    var goods=this.data.goodsDetailData
    goods.isSelect=true
    goods.buyNum=this.data.buyNum
    // console.log(goods);
    // console.log(this.data.gid);
    var gid=this.data.gid
    var cartDatas=wx.getStorageSync('carts') || []
    console.log(cartDatas);
    if(cartDatas.length>0){
      for(var key in cartDatas){
        //如果购物车中存在当前数据
        if(cartDatas[key].goods_id==gid){
          cartDatas[key].buyNum=cartDatas[key].buyNum+this.data.buyNum
          try{
            wx.setStorageSync('carts', cartDatas)
            wx.showToast({
              title: '添加成功',
              icon: 'success',
              duration: 2000
            })
            this.closeMaskFn()
          }catch(err){
            console.log(err);  
            wx.showToast({
              title: '添加失败',
              icon: 'error',
              duration: 2000
            })
          }
          return;
        }
        //购物车中没有当前数据，并且购物车中已经存在数据
      }
        cartDatas.unshift(goods)
    }else{
      cartDatas.unshift(goods)
      this.closeMaskFn()
    }
    
    wx.setStorageSync('carts', cartDatas)
    
    
    
  }


})