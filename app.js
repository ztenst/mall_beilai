//app.js
App({
    onLaunch: function () {
    },
    /**
     * 获取个人信息
     * @returns {Promise}
     */
    getUserInfo: function () {
        var self = this
        return new Promise((resolve, reject) => {
            if (self.globalData.userInfo) {
                resolve(self.globalData.userInfo)
            } else {
                //调用登录接口
                wx.login({
                    success: function () {
                        wx.getUserInfo({
                            success: function (res) {
                                self.globalData.userInfo = res.userInfo;
                                resolve(res.userInfo)
                            }
                        })
                    }
                })
            }
        })
    },
    /**
     * 页面跳转 pageUrl 页面路径，isRedirectTo 是否强制使用redirectTo来跳转
     * 需要注意的是 传递页面的参数时只能是字字符串
     * @param pageUrl
     * @param data
     * @param isRedirectTo
     */
    goPage: function (pageUrl, data, isRedirectTo) {
        let length = getCurrentPages().length;
        //如果传了data 就做参数的拼接
        if (data != null) {
            let param = Object.keys(data)
                .map(key => key + '=' + data[key])
                .join('&');
            pageUrl = pageUrl + "?" + param;
        }
        if (isRedirectTo || length >= 5) {
            wx.redirectTo({url: pageUrl})
        } else {
            wx.navigateTo({url: pageUrl});
        }
    },
    globalData: {
        userInfo: null
    }
})