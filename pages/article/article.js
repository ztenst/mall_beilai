//article.js
import {
    $detailContent
} from '../../components/wxcomponents'

//获取应用实例
import api from '../../common/api'
import Util from '../../utils/util'

const app = getApp();

Page({
    data: {},
    onLoad: function (options) {
        let self = this;
        let apiname = options.type === 'find' ? 'getFindInfo' : 'getCaseInfo';

        api[apiname]({id: options.id}).then(res => {
            let json = res.data;
            if (json.status == 'success') {
                wx.setNavigationBarTitle({title: json.data.name});//设置导航条标题

                self.setData({
                    articleInfo: json.data,
                });
                /**
                 *初始化图文详情组件
                 */
                $detailContent.init('news', {
                    content: json.data.content.trim()
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
    onShow: function () {},

});
