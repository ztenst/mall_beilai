//detail.js
import config from '../../config'
//获取应用实例
import api from '../../common/api'
const app = getApp();

Page({
    data: {
        static_path: config.static_path,

        product_id:'',

    },
    onLoad: function (options) {
        var self = this;
        let product_id = options.id;
        self.setData({product_id: product_id});
    },
    onShow: function () {
        let self = this;
        let product_id = self.data.product_id;

        self.getProductInfo(product_id);
    },
    getProductInfo(product_id){
        let self =this;
        api.getProductInfo({id: product_id}).then(res => {
            let data = res.data.data;
            if (res.data.status === 'success') {
                self.setData({productInfo: data});
                self.setData({title: data.title});
                wx.setNavigationBarTitle({title: data.title});//设置导航条标题
                console.log(self.data.productInfo)



            } else {
                wx.showToast({
                    title: res.data.msg,
                    icon: 'loading',
                    duration: 1000,
                })
                setTimeout(() => {
                    wx.navigateBack({
                        delta: 1
                    })
                }, 1000);
            }
        });
    },

    tabFun(e){
       let self=this,dataset=e.currentTarget.dataset;
       self.setData({
            tabIndex:dataset.index
       })
    }
});
