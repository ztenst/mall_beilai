/* eslint-disable camelcase,spaced-comment,no-undef,comma-spacing */
import config from '../config'
import Util from '../utils/util'

//无论promise对象最后状态如何都会执行
Promise.prototype.finally = function (callback) {
    let P = this.constructor;
    return this.then(
        value => P.resolve(callback()).then(() => value),
        reason => P.resolve(callback()).then(() => {
            throw reason
        })
    );
};

/**
 * 微信请求promise化
 * @param  {Function} fn [description]
 * @return {[type]}      [description]
 */
function wxPromisify(fn) {
    return function (obj = {}) {
        return new Promise((resolve, reject) => {
            obj.success = function (res) {
                //成功
                resolve(res)
            }
            obj.fail = function (res) {
                //失败
                reject(res)
            }
            fn(obj)
        })
    }
}

/**
 * 微信请求get方法
 * url
 * data 以对象的格式传入
 */
function getRequest(url, data = {}) {
    var getRequest = wxPromisify(wx.request)
    return getRequest({
        url: url,
        method: 'GET',
        // data: Util.filterEmpty(data),
        data: data,
        header: {
            'Content-Type': 'application/json'
        }
    })
}

/**
 * 微信请求post方法封装
 * url
 * data 以对象的格式传入
 */
function postRequest(url, data = {}) {
    var postRequest = wxPromisify(wx.request)
    return postRequest({
        url: url,
        method: 'POST',
        data: Util.filterEmpty(data),
        header: {
            "content-type": "application/x-www-form-urlencoded"
        },
    })
}

const api = {
    /*首页*/
    getIndex() {
        let url = `${config.host}/api/index/index`;
        return getRequest(url)
    },
    /*产品列表*/
    getProductList(params) {
        let url = `${config.host}/api/product/list`;
        return getRequest(url, params)
    },
    /*产品类别*/
    getCates(params) {
        let url = `${config.host}/api/product/getCates`;
        return getRequest(url, params)
    },
    /*发现列表*/
    getFindList(params) {
        let url = `${config.host}/api/find/list`;
        return getRequest(url, params)
    },
    /*案例列表*/
    getCusist(params) {
        let url = `${config.host}/api/cus/list`;
        return getRequest(url, params)
    },


};

module.exports = api