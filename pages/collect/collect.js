//collect_list.js
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
        "banner_list": [
            {
                "id": 0,
                "url": "../../images/i-01.png"
            },
            {
                "id": "8273",
                "url": "../../images/i-02.png"
            }
        ],
        "cate_list":[
            {
                "id":1,
                "image":"../../images/icon-chu.png",
                "title":"橱柜"
            },
            {
                "id":2,
                "image":"../../images/icon-yi.png",
                "title":"衣柜"
            },
            {
                "id":3,
                "image":"../../images/icon-xie.png",
                "title":"鞋柜"
            },
            {
                "id":4,
                "image":"../../images/icon-jiu.png",
                "title":"酒柜"
            },
            {
                "id":5,
                "image":"../../images/icon-tata.png",
                "title":"榻榻米"
            },

        ]
    },
    onLoad: function () {

    }
});
