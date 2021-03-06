//find.js
import {
    $tabBar
} from '../../components/wxcomponents'
import config from '../../config'
import api from '../../common/api'

//获取应用实例
const app = getApp();

Page({
    data: {
        static_path: config.static_path,

        page: 0,
        max_page: 0,
        scrollTop: 100,
        requested: false, // 判断是否请求过数据, 每次重新搜索会重置
        loading: false,
        list: []
    },
    onLoad: function () {
        let  self = this;
        /**
         * 初始化tabBar组件
         */
        $tabBar.init({
            tabIndex:3
        });
        self.requestList();
    },
    /**
     * 跳转发现文章详情页
     * @param e
     */
    go_article(e){
        let dataset = e.currentTarget.dataset,url='/pages/article/article';
        app.goPage(url,dataset,false);
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

        api.getFindList(params).then(resp => {
            let json = resp.data;
            let list = json.data.list;

            if (json.data.page_count > 0 && list.length > 0) {
                //requested 和loading要和数据一起设置, 否则会有极短时间显示出"无数据"
                self.setData({
                    requested: true,
                    loading: false,
                    max_page: json.data.page_count,
                    list: state.list.concat(list),
                });

            } else {
                self.setData({
                    requested: true,
                    loading: false,
                })
            }
        })

    },
    /**
     * 转发分享
     * @param res
     * @returns {{title: string, path: string}}
     */
    onShareAppMessage(res) {
        return {
            title:'贝莱橱柜',
            path: 'pages/find/find'
        }
    }

})
;
