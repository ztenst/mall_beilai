//index.js
import {
    $swiper,
    $productList,
    $tabBar,
    $toast
} from '../../components/wxcomponents'

import api from '../../common/api'


//获取应用实例
const app = getApp();

Page({
    data: {
        kw:'',
        focused: false,

        page: 0,
        max_page: 0,
        scrollTop: 100,
        requested: false, // 判断是否请求过数据, 每次重新搜索会重置
        loading: false,
        product_list: []
    },
    onLoad: function () {
        let self = this;
        /**
         * 初始化tabBar组件
         */
        $tabBar.init({
            tabIndex: 1
        });

        app.getUserOpenId().then(res => {
            let json = res.data;
            if(json.status=='success'){
                app.globalData.wxData.uid = json.data;
            }else{
                $toast.show({
                    timer: 2e3,
                    text: json.msg
                });
            }
        });


        /**
         * 初始化产品列表组件
         */
        $productList.init();

        //
        api.getIndex().then(resp => {
            let json = resp.data;
            if (json.status == 'success') {
                self.setData({
                    index: json.data,
                    imgUrls: json.data.imgs
                });
                $swiper.init({
                    indicatorDots: true,
                    autoplay: true,
                    interval: 3000,
                    duration: 100,
                });
            }
        });

        /**
         * 产品列表数据渲染
         */
        self.requestList();
    },

    requestList() {
        let self = this;
        let state = self.data;
        if (state.loading) return;
        if (state.requested && state.page >= state.max_page) return;

        self.setData({
            loading: true,
            page: state.page + 1
        });

        let params = Object.assign({}, {page: this.data.page});

        api.getProductList(params).then(resp => {
            let json = resp.data;
            let list = json.data.list;
            if (json.data.page_count > 0 && list.length > 0) {
                //requested 和loading要和数据一起设置, 否则会有极短时间显示出"无数据"
                self.setData({
                    requested: true,
                    loading: false,
                    max_page: json.data.page_count,
                    product_list: state.product_list.concat(list),
                });

            } else {
                self.setData({
                    requested: true,
                    loading: false,
                });
            }
        });
    },

    go_category(e) {
        let url = "/pages/category/category";
        if (e) {
            let dataset = e.currentTarget.dataset;
            app.goPage(url, {cid: dataset.id}, false);
        } else {
            app.goPage(url, null, false);
        }
    },
    go_detail(e){
        let dataset = e.currentTarget.dataset, url="/pages/detail/detail";
        app.goPage(url, {id: dataset.id}, false);
    },

    //搜索得到焦点
    focus() {
        this.setData({
            focused: true
        });
    },
    //设置搜索输入的关键字
    inputkw(e) {
        let self = this;
        self.setData({
            kw: e.detail.value
        });
    },
    //搜索确认
    confirm(e) {
        console.log(e.detail.value)
        let url="/pages/category/category";
        app.goPage(url,{kw:e.detail.value},false)
    },

    /**
     * 首页转发分享
     * @param res
     * @returns {{title: string, path: string}}
     */
    onShareAppMessage(res) {
        return {
            title:'贝莱橱柜',
            path: 'pages/index/index'
        }
    }



})
;
