//index.js
//获取应用实例
import {
    $tabBar
} from '../../components/wxcomponents'
const app = getApp();

Page({
    /**
     * 页面初始化数据
     */
    data: {},

    onLoad: function () {

        /**
         * 初始化tabBar组件
         */
        $tabBar.init({
            tabIndex:5
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
    }
});
