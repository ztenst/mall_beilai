//detail.js
import config from '../../config'
//获取应用实例
const app = getApp();

Page({
    data: {
        static_path: config.static_path,

        indicatorDots: true,
        autoplay: true,
        interval: 3000,
        duration: 100,
        tabIndex:1,
        "banner_list": [
            {
                "id": 0,
                "url": "http://ozz7ch6ms.bkt.clouddn.com/750x826.jpg"
            },
            {
                "id": "8273",
                "url": "http://ozz7ch6ms.bkt.clouddn.com/750x826.jpg"
            }
        ]
    },
    onLoad: function () {

    },
    tabFun(e){
       let self=this,dataset=e.currentTarget.dataset;
       self.setData({
            tabIndex:dataset.index
       })
    }
});
