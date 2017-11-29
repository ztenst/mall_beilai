//my.js
//获取应用实例
import {
    $tabBar
} from '../../components/wxcomponents'
import api from '../../common/api'
const app = getApp();

Page({
    /**
     * 页面初始化数据
     */
    data: {},

    onLoad: function () {
        let self =this;
        /**
         * 初始化tabBar组件
         */

        $tabBar.init({
            tabIndex:5
        });

        app.getUserOpenId().then(res => {
            self.setData({
                userInfo:app.globalData.userInfo
            })
        });
    },

    toPage(e) {
        let type = e.currentTarget.dataset.type, url = "";
        if (type == "brief") {
            url = "/pages/brief/brief";
        } else if (type == "collect") {
            url = "/pages/collect/collect";
        } else if (type == "order") {
            url = "/pages/order/order";
        }
        app.goPage(url, null, false);
    },
    contactShop(){

        api.getIndexConfig().then(res=>{
            let json= res.data;
            console.log(json);
            if(json.status=='success'){
                if(json.data.phone){
                    wx.makePhoneCall({
                        phoneNumber: json.data.phone
                    });
                }
            }
        })
    }
});
