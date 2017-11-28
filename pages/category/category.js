//category.js
import {
    $searchFilter,
    $productList,
    $tabBar
} from '../../components/wxcomponents'
import config from '../../config'
import api from '../../common/api'
import Util from '../../utils/util'

//获取应用实例
const app = getApp();

Page({
    data: {
        static_path: config.static_path,

        kw:'',
        page: 0,
        max_page: 0,
        scrollTop: 100,
        requested: false, // 判断是否请求过数据, 每次重新搜索会重置
        loading: false,
        filters: {},//筛选字段
        product_list: []
    },
    onLoad: function (query) {
        let self = this;
        /**
         * 初始化tabBar组件
         */
        $tabBar.init({
            tabIndex:2
        });
        let _q = Object.assign({}, Util.decodeKeys(query));

        self.searchFilterInit(_q, false);

    },

    /**
     * 筛选组件初始化
     * @param _q
     * @param isFinishInit
     */
    searchFilterInit(_q, isFinishInit) {
        let self = this;
        //筛选组件初始化
        $searchFilter.init({
            filters: _q, //传入筛选条件
            isFinishInit: isFinishInit,
            onFilter(filters) {
                self.restartSearch(filters);
            }
        })
    },

    /**
     * 重置搜索
     * @param filters
     */
    restartSearch(filters) {
        this.setData({
            page: 0,
            max_page: 0,
            requested: false,
            filters: filters,
            product_list: []
        })
        this.requestList()
    },

    /**
     *搜索列表
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

        let params = Object.assign({},self.data.filters, {page: this.data.page});
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
                    total: json.data.num
                });

            } else {
                self.setData({
                    requested: true,
                    loading: false,
                    total: json.data.num
                })
            }
        })

    },
});
