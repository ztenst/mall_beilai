import Component from '../component'

let app = getApp();

const SCOPE = '$swiper';

export default {
    /**
     * 默认参数
     */
    setDefaults() {
        return {
            //图片
            hdimg: [],
            //是否采用衔接滑动
            circular: true,
            //是否显示画板指示点
            indicatorDots: false,
            //选中点的颜色
            indicatorcolor: "#000",
            //是否竖直
            vertical: false,
            //是否自动切换
            autoplay: false,
            //滑动动画时长毫秒
            duration: 100,
            //所有图片的高度
            imgheights: [],
            //图片宽度
            imgwidth: 750,
            //默认
            current: 0,
            //是否裁剪
            isCut:false
        }
    },

    init(opts = {}) {
        const options = Object.assign({}, this.setDefaults(), opts);
        const component = new Component({
            scope: SCOPE,
            data: options,
            methods: {
                // imageLoad: function (e) {
                //     /**
                //      * 获取图片真实宽度
                //      * @type {Number|number|string|*}
                //      */
                //     let imgwidth = e.detail.width,
                //         imgheight = e.detail.height,
                //         //宽高比
                //         ratio = imgwidth / imgheight;
                //
                //     //计算的高度值
                //     let viewHeight = 750 / ratio,imgheight = viewHeight;
                //
                //     let data = this.getComponentData();
                //
                //     var imgheights = data.imgheights;
                //     //把每一张图片的高度记录到数组里
                //     imgheights.push(imgheight)
                //     this.setData({
                //         [`${SCOPE}.imgheights`]: imgheights,
                //     })
                // },
                // bindchange: function (e) {
                //     this.setData({[`${SCOPE}.current`]: e.detail.current});
                // },
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