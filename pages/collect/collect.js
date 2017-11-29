import {
    $productList,
    $tabBar
} from '../../components/wxcomponents'
import api from '../../common/api'
let app = getApp();

Page({
    data: {

        page: 0,
        max_page: 0,
        requested: false, // 判断是否请求过数据, 每次重新搜索会重置
        loading: false,
        filters: {},
        product_list: []

    },

    onLoad() {
        let self = this;
        /**
         * 初始化tabBar组件
         */
        $tabBar.init({
            tabIndex: 5
        });
        /**
         * 初始化产品列表组件
         */
        $productList.init();

        /**
         * 列表组件初始化
         */
        self.requestList();
    },
    /**
     * 搜索房产
     */
    requestList() {
        let self = this;
        let state = self.data;
        if (state.loading) return;
        if (state.requested && state.page >= state.max_page) return;

        self.setData({
            loading: true,
            page: state.page + 1
        });

        let params = Object.assign({'uid': app.globalData.wxData.uid, 'save': 1}, {page: this.data.page});

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
        })

    }
});