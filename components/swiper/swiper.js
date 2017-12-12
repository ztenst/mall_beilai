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
            autoplay: false,
            interval: 0,
            duration: 0,
            //所有图片的高度
            imgheights: [],
            //图片宽度
            imgwidth: wx.getSystemInfoSync().screenWidth,
            //默认
            index: 0,
            //是否裁剪
            isCut: false,
            onclick(){}
        }
    },

    init(opts = {}) {
        const options = Object.assign({}, this.setDefaults(), opts);
        const component = new Component({
            scope: SCOPE,
            data: options,
            methods: {
                imageLoad: function (e) {
                    let  self =this;
                    let data = self.getComponentData();
                    //获取图片真实宽度
                    var imgwidth = e.detail.width,
                        imgheight = e.detail.height,
                        index = e.currentTarget.dataset.index;
                    //计算的高度值
                    var imgheight = 750 / (imgwidth / imgheight);
                    var imgheights = data.imgheights
                    //把每一张图片的高度记录到数组里
                    imgheights[index]=imgheight;
                    self.setData({
                        [`${SCOPE}.imgheights`]: imgheights,
                    });
                },
                bindchange: function (e) {
                    this.setData({[`${SCOPE}.index`]: e.detail.current});
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
                    });
                    typeof options.onclick === 'function' && options.onclick(cur,imageList);
                },
            }
        });

        return component;
    }
}