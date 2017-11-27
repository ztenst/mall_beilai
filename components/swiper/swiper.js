import Component from '../component'
let app = getApp();

const SCOPE = '$swiper';

export default {
    /**
     * 默认参数
     */
    setDefaults() {
        return {}
    },

    init(opts = {}) {
        const options = Object.assign({}, this.setDefaults(), opts);
        const component = new Component({
            scope: SCOPE,
            data: options,
            methods: {
            }
        });

        return component;
    }
}