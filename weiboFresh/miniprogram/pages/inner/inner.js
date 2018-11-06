Page({
  data: {
    username: '',
    focusNum: '',
    topImg: '',
    topTitle: '',
    subNews: [],
    catalogIndex: null

  },
  onCatalog: function(e) {
    e.detail // 自定义组件触发事件时提供的detail对象
    console.log(e.detail.index)
    this.setData({
      catalogIndex : e.detail.index
    })
    // this.selectComponent("#list").getList();
    this.subNews.goTop();
  },
  onLoad: function(options) {
    let dataPack = JSON.parse(options.dataPack)
    console.log(dataPack)
    let username = dataPack.name
    let focusNum = dataPack.focusNum
    let topImg = dataPack.imgUrl
    let topTitle = dataPack.title
    let subNews = dataPack.subNews

    wx.cloud.callFunction({
      name: 'innerResourceGet',
      data: {
        a: subNews
      }
    }).then(res => {
      console.log(res)
      this.setData({
        subNews: res.result,
        topImg,
        topTitle,
        focusNum,
        username
      })
      console.log(this.data.focusNum)
    }).catch(err => {
      console.log(err)
    })
  },
  onReady:function(){
    this.subNews = this.selectComponent("#subNews");
  },
})