//detail.js
import {
    $swiper,
} from '../../components/wxcomponents'
import config from '../../config'
//获取应用实例
import api from '../../common/api'
import Util from '../../utils/util'

const app = getApp();

Page({
    data: {
        static_path: config.static_path,
        tabIndex:1,
        product_id: '',

    },
    onLoad: function (options) {
        var self = this;
        let product_id = options.id;
        self.setData({product_id: product_id});
    },
    onShow: function () {
        let self = this;
        let product_id = self.data.product_id;

        self.getProductDetail(product_id);
    },
    getProductDetail(product_id) {
        let self = this;
        api.getProductInfo({id: product_id}).then(res => {
            let json = res.data;
            if (json.status == 'success') {
                wx.setNavigationBarTitle({title: json.data.name});//设置导航条标题
                json.data.params = Util.objToArr(json.data.params);//产品参数返回值格式转换
                console.log(json.data)
                self.setData({
                    productInfo: json.data,
                    imgUrls: json.data.images,
                });
                /**
                 * 初始化轮播图组件
                 */
                $swiper.init({
                    indicatorDots: true,
                    autoplay: true,
                    interval: 3000,
                    duration: 100,
                });
            } else {
                wx.showToast({
                    title: json.msg,
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

    tabFun(e) {
        let self = this, dataset = e.currentTarget.dataset;
        self.setData({
            tabIndex: dataset.index
        })
    }
});
