import Component from '../component'

let app = getApp();

const SCOPE = '$swiper';

export default {
    /**
     * 默认参数
     */
    setDefaults() {
        return {
            //是否采用衔接滑动
            circular: false,
            //是否显示画板指示点
            indicatorDots: false,
            //选中点的颜色
            indicatorcolor: "#000",
            //是否竖直
            vertical: false,
            //是否自动切换
            autoplay: false,
            //滑动动画时长毫秒
            duration: 2000,
            //所有图片的高度
            imgheights: [],
            //图片宽度
            imgwidth: wx.getSystemInfoSync().screenWidth,
            //默认
            current: 0,
            //是否裁剪
            isCut: false
        }
    },

    init(opts = {}) {
        const options = Object.assign({}, this.setDefaults(), opts);
        const component = new Component({
            scope: SCOPE,
            data: options,
            methods: {
                // imageLoad: function (e) {
                //     let  self =this;
                //     /**
                //      * 获取图片真实宽度
                //      * @type {Number|number|string|*}
                //      */
                //     let $width = e.detail.width;
                //     let $height = e.detail.height;
                //         //宽高比
                //     let ratio = $width/$height;
                //
                //     let data = self.getComponentData();
                //
                //     //计算的高度值
                //     let imgHeight = data.imgwidth/ratio;
                //     let imgheights = data.imgheights;
                //
                //     console.log(imgheights)
                //     //把每一张图片的高度记录到数组里
                //     imgheights.push(parseInt(imgHeight));
                //
                //     if(imgheights.length == data.imgheights.length){
                //         self.setData({
                //             [`${SCOPE}.imgheights`]: imgheights.reverse(),
                //         });
                //     }
                //
                //
                // },
                bindchange: function (e) {
                    this.setData({[`${SCOPE}.current`]: e.detail.current});
                },

                /**
                 * 查看大图
                 * @param {String} cur 当前展示图片
                 * @param {Array}  imageList 展示的图片列表
                 */
                viewPic(e) {
                    let cur = e.currentTarget.dataset.current;
                    let urls = e.currentTarget.dataset.urls;
                    let imageList = [];
                    urls.forEach(item => {
                        imageList.push(item)
                    })
                    wx.previewImage({
                        current: cur,
                        urls: imageList
                    });
                },
            }
        });

        return component;
    }
}