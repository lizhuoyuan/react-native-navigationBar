/**
 * Created by 李卓原 on 2018/7/6.
 * email: zhuoyuan93@gmail.com
 *
 */

import React from 'react';
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    Platform,
    StatusBar,
    ViewPropTypes
} from 'react-native';

//ScreenUtil 为屏幕尺寸适配的工具类
import * as ScreenUtil from "../utils/ScreenUtil";
import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';

const NAV_BAR_HEIGHT_ANDROID = 50;
const NAV_BAR_HEIGHT_IOS = 44;

const StatusBarShape = {
    barStyle: PropTypes.oneOf(['light-content', 'default', 'dark-content']),
    hidden: PropTypes.bool,
    backgroundColor: PropTypes.string,
};

class NavigationBar extends React.Component {

    static propTypes = {
        statusBar: PropTypes.shape(StatusBarShape),
        style: ViewPropTypes.style,
        title: PropTypes.string,
        titleView: PropTypes.element,
        titleLayoutStyle: ViewPropTypes.style,

        showLeft: PropTypes.bool,
        leftText: PropTypes.string,
        leftTextStyle: ViewPropTypes.style,
        showleftImg: PropTypes.bool,
        leftButton: PropTypes.element,

        showRight: PropTypes.bool,
        rightText: PropTypes.string,
        rightTextStyle: ViewPropTypes.style,
        rightButton: PropTypes.element,
    };

    static defaultProps = {
        statusBar: {
            barStyle: 'default',
            hidden: false,
        },
        showLeft: true,
        showleftImg: true,  //是否显示返回箭头
        leftText: 'Back',   //返回键位置的文字
        showRight: false,
        rightText: '更多',

    };

    constructor(props) {
        super(props);
    }

    render() {
        // let {color} = this.props;
        let leftButton = this._renderLeft();
        let rightButton = this._renderRight();
        let statusBar = <View>
            <StatusBar {...this.props.statusBar}/></View>;
        let titleView = this.props.titleView ? this.props.titleView :
            <Text style={[styles.titleStyle, this.props.titleLayoutStyle]}>{this.props.title}</Text>;
        let content = <View style={styles.content}>
            {leftButton}
            <View style={styles.titleView}>{titleView}</View>
            {rightButton}
        </View>;
        return (
            //这里有一个{backgroundColor: color} 这个背景色可以写在styles.container样式中，颜色自己定义
            <View style={[styles.container,
                //{backgroundColor: color},
                this.props.style]}>
                {statusBar}
                {content}
            </View>
        )
    }

    _renderLeft() {
        let {leftButton, leftTextStyle, showLeft, navigation, onLeftClick, leftText, showleftImg} = this.props;
        if (!showLeft) {
            return null;
        }
        if (leftButton == null) {
            return (
                <TouchableOpacity onPress={() => {
                    if (onLeftClick) {
                        onLeftClick();
                    } else {
                        if (navigation) navigation.goBack()
                    }
                }}>
                    <View style={styles.leftContainer}>
                        {
                            showleftImg ?
                                <Ionicons name={'ios-arrow-back'} size={30} color={'#fff'}
                                          style={{marginRight: ScreenUtil.scaleSize(8)}}/>
                                : null
                        }
                        <Text style={[styles.leftRightStyle, leftTextStyle]}>{leftText}</Text>
                    </View>
                </TouchableOpacity>)
        }
        return leftButton;
    }

    _renderRight() {
        let {rightButton, rightTextStyle, showRight, onRightClick, rightText} = this.props;
        if (!showRight) {
            return null;
        }
        if (rightButton == null) {
            return (
                <TouchableOpacity onPress={() => {
                    if (onRightClick) {
                        onRightClick()
                    }
                }}>
                    <View>
                        <Text style={[styles.leftRightStyle, rightTextStyle]}>{rightText}</Text>
                    </View>
                </TouchableOpacity>)
        }
        return rightButton;
    }
}

/**
 * //selector：这是你自己编写的一个函数。这个函数声明了你的组件需要整个 store 中的哪一部分数据作为自己的 props
 * 如果用不到redux这个方法可以删除
 * @param store
 * @returns {{color: *}}
 */
function changeColor(store) {
    return {
        color: store.changeColorReducer.color
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'green'
    },
    content: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        height: Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID,
    },
    titleView: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 40,
        right: 40,
        top: 0,
        bottom: 0,
    },
    titleStyle: {
        fontSize: ScreenUtil.setSpText(18),
        color: 'white'

    },
    leftRightStyle: {
        color: 'white',
        fontSize: ScreenUtil.setSpText(14)
    },

    leftContainer: {
        marginLeft: ScreenUtil.scaleSize(15),
        flexDirection: 'row',
        alignItems: 'center'
    }
});

// 包装 component ，注入 dispatch 和 state 到其默认的 connect(selector)(App) 中；
/**
 * 把这个组件用connect包裹住就能拿到store。
 注意export default已经拿到下面来了，上面的class前面的导出要删掉
 用redux的话需要第一种方法导出，已注释掉
 */
//export default connect(changeColor)(withNavigation(NavigationBar));
//用不到redux推荐在定义类的时候直接导出，类定义为 export default class ...

//当这个组件拿不到this.props.navigation时，可使用withNavigation
//withNavigation是一个更高阶的组件，它将导航道具传递给一个包装组件。
//当您无法直接将导航道具传递到组件时，或者在深度嵌套子节点的情况下不希望传递导航道具时，它非常有用。
//导出方式：export default withNavigation(NavigationBar);
export default NavigationBar;
