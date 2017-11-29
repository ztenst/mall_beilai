import { $toast} from '../../components/wxcomponents'
import api from '../../common/api'
import Util from '../../utils/util'

let app = getApp();

Page({
    data: {
        pid:''
    },
    onLoad: function (options) {
        wx.setNavigationBarTitle({title: '提交表单'});//设置导航条标题
        var self = this;
        self.setData({pid: options.id});
    },

    /**
     * 获取用户手机号
     * @param e
     */
    getPhone(e) {
        let that = this;
        that.setData({
            phone: e.detail.value
        });
    },
    /**
     * 获取用户姓名
     * @param e
     */
    getName(e) {
        let that = this;
        that.setData({
            name: e.detail.value
        });
    },

    /**
     * 报备的表单提交
     * @param e
     * @returns {boolean}
     */
    addOrder(e) {
        let self = this, fObj = e.detail.value;
         console.log(fObj)

        if (!fObj.username) {
            $toast.show({
                timer: 2e3,
                text: '请输入姓名',
            });
            return false;
        }
        if (!/^\d{11}$/.test(fObj.phone) && !fObj.phone) {
            $toast.show({
                timer: 2e3,
                text: '手机号错误',
            });
            return false;
        }


        const pack = {
            pid: self.data.pid,
            openid: app.globalData.wxData.open_id,
            phone: fObj.phone,
            username: fObj.username,
            note:fObj.note
        }

        api.addOrder(pack).then((res) => {
            let data = res.data;
            $toast.show({
                timer: 3e3,
                text: data.msg,
            });
            if (data.status == 'success') {
                setTimeout(function () {
                    wx.navigateBack({
                        delta: 1
                    })
                },2e3)
            }
        })
    }

});
