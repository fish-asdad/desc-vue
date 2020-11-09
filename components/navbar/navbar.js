// components/navbar/navbar.js.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    parmas: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    navH: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    attached() {
      this.setData({
        navH: app.globalData.navbarHeight
      })
    }
  }
})