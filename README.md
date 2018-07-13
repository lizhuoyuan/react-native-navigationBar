# react-native-navigationBar
用于ReactNative的标题栏NavigationBar组件 <br/>

博客地址：https://blog.csdn.net/u011272795/article/details/80722036

#### 属性：
| Prop | Type | Default | Description
| ---------- | :-----------:         |:---------------:| -----------|
| style      | ViewPropTypes.style | -               |标题栏的样式 |
| title      | string              | -               |标题使用的字符串 |
| titleLayoutStyle  | ViewPropTypes.style   | -               |标题文字的样式
| titleView  | PropTypes.element   | -               |替换标题文字的组件
| leftButton  | PropTypes.element   | -              |自定义左侧按钮
| leftText  | string   | Back               |左侧返回按钮的文字
| leftTextStyle  | ViewPropTypes.style   | -               |替换标题文字的组件
| showleftImg  | bool   | true             |是否显示标题的后退按钮，本组件使用的是react-native-vector-icons中的图标，可自行替换成其他Image
| showLeft  | bool   | true             | 是否显示返回按钮
| showRight  | bool   | true             | 是否显示右侧按钮
| rightText  | string   |    更多           | 右侧按钮的文字
| rightTextStyle  | ViewPropTypes.style    | -             | 是否显示返回按钮
| rightButton  | PropTypes.element   | -             | 自定义右侧按钮
