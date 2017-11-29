//brief.js
import {
    $tabBar,$detailContent
} from '../../components/wxcomponents'
import api from '../../common/api'

//获取应用实例
const app = getApp();

Page({
    data: {

    },
    onLoad: function () {
        let self = this;
        /**
         * 初始化tabBar组件
         */
        $tabBar.init({
            tabIndex: 5
        });

        api.getIntro().then(res=>{
            let json= res.data;
            console.log(json);
            if(json.status=='success'){
                /**
                 *初始化图文详情组件
                 */
                $detailContent.init('news', {
                    content: json.data.content.trim()
                });
            }
        })


    },
});
