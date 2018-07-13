/**
 * zhuoyuan93@gmail.com
 * 屏幕工具类 以及一些常用的工具类封装
 * ui设计基准,iphone 6
 * width:750px
 * height:1334px
 * @2x
 */
import {
    PixelRatio,
    Dimensions,
} from 'react-native';

export let screenW = Dimensions.get('window').width;
export let screenH = Dimensions.get('window').height;
export const fontScale = PixelRatio.getFontScale();
export let pixelRatio = PixelRatio.get();
//像素密度
export const DEFAULT_DENSITY = 2;
//px转换成dp
//以iphone6为基准,如果以其他尺寸为基准的话,请修改下面的750和1334为对应尺寸即可.
const defaultWidth = 375;
const defaultHeight = 667;
const w2 = defaultWidth / DEFAULT_DENSITY;
//px转换成dp
const h2 = defaultHeight / DEFAULT_DENSITY;

/**
 * 屏幕适配,缩放size
 * @param size
 * @returns {Number}
 */
export function scaleSize(size: Number) {
    return size / defaultWidth * screenW;
}


/**
 * 设置字体的size（单位px）
 * @param size 传入设计稿上的px
 * @returns {Number} 返回实际sp
 */
export function setSpText(size: Number) {
    return size / defaultWidth * screenW * fontScale;
}

export function setSpText2(size: Number) {
    let scaleWidth = screenW / w2;
    let scaleHeight = screenH / h2;
    let scale = Math.min(scaleWidth, scaleHeight);
    size = Math.round((size * scale + 0.5));

    return size / DEFAULT_DENSITY * fontScale;
}

/**
 * 判断对象，数组，字符串是否为空
 * @param str  (null|undefined|''|'   '|[]|{}) 均判断为空，返回true
 * @returns {boolean}
 */
export function isEmpty(str) {
    if (!str) {
        return true;
    } else if (typeof str === 'object' && Object.keys(str).length === 0) {
        return true;
    } else if (typeof str === 'string' && str.replace(/(^\s*)|(\s*$)/g, "").length === 0) {
        return true;
    }
    return false;
}