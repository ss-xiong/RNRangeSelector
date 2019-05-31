import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, PanResponder, Image, StyleSheet } from 'react-native'
import * as utils from './utils'

import styles from './style'

class PriceSlider extends PureComponent {
  static propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    defaultMin: PropTypes.number,
    defaultMax: PropTypes.number,
    getSlider: PropTypes.func,
    onMoveChange: PropTypes.func,
    sliderMoveStart: PropTypes.func,
    sliderMoveEnd: PropTypes.func,
    backgroundBarStyle: PropTypes.object,
    frontBarStyle: PropTypes.object,
  }

  static defaultProps = {
    min: 0,
    max: 1,
    defaultMin: 0,
    defaultMax: 1,
    onMoveChange: () => {},
    sliderMoveStart: () => {},
    sliderMoveEnd: () => {},
    getSlider: () => (<View style={styles.sliderStyle} />),
    backgroundBarStyle: {
      backgroundColor: '#F0F2F5',
      height: utils.getRpx(4),
    },
    frontBarStyle: {
      backgroundColor: '#FFAC00',
      height: utils.getRpx(4),
    }
  }

  state = {
    firstSliderLeft: 0, // 第一个滑块滑动过程中距离左边的距离
    secondSliderLeft: 0, // 第二个滑块滑动过程中距离左边的距离
    sliderWidth: 0, // 滑块宽度。两个滑块一样的
    sliderHeight: 0, // 滑块高度
    wrapHeight: 0, // 父容器高度。
    backgroundBarStyle: {}, // 背景条样式
    frontBarStyle: {}, // 连线条样式
  }

  distance = {
    pricePerPx: 1, // 移动一个像素对应价格变化的大小
    firstSliderLeftInitial: 0, // 第一个滑块初始滑动时距离左边的距离
    secondSliderLeftInitial: 100, // 第二个滑块初始滑动时距离左边的距离
    moveableDistance: 0, // 使用固定块来获取可移动距离
  }

  // 开始时候需要记录初始值
  handleStartShouldSetPanResponder = () => {
    // 触发开始滑动事件
    this.props.sliderMoveStart()
    return true
  }

  // 开始滚动时候需要记录初始值
  handleMoveShouldSetPanResponder = () => {
    return true
  }

  // 第一个滑块滑动的时候
  handleFirstSliderPanResponderMove = (e, gestureState) => {
    const { dx } = gestureState
    // 滑动前距离左边的距离
    const { firstSliderLeftInitial } = this.distance
    // 滑动过程中的距离
    const temDistance = firstSliderLeftInitial + Math.round(dx)

    // 右滑判断右边距
    if(temDistance > firstSliderLeftInitial) {
      //获取最大可移动距离
      let moveableDistance = this.getSliderMoveableDistance('first')

      // 滑动之后的值不能大于超出父容器
      if(temDistance <= moveableDistance) {
        this.setFirstSliderLeft(temDistance)
      } else {
        // 小于初始值就设置为初始值
        this.setFirstSliderLeft(moveableDistance)
      }
    } else {
      // 左滑判断左边距
      // 滑动之后的值不能小于距离左边初始值
      if(temDistance >= 0 ) {
        this.setFirstSliderLeft(temDistance)
      } else {
        // 小于初始值就设置为初始值
        this.setFirstSliderLeft(0)
      }
    }
  }

  // 第一个滑块放开的时候
  handleFirstSliderPanResponderRelease = (e, gestureState) => {    
    // 记录滑动过后的值
    const { firstSliderLeftInitial } = this.distance
    // 计算滑动过后应该重新设置的初始值
    const _sliderLeftInitial = firstSliderLeftInitial + gestureState.dx

    // 左滑：滑动后的值小于滑动前的值
    if(_sliderLeftInitial <= firstSliderLeftInitial) {
      // 距离最左边的初始值
      if(_sliderLeftInitial < 0) {
        this.distance.firstSliderLeftInitial = 0
      } else {
        this.distance.firstSliderLeftInitial = _sliderLeftInitial
      }
    } else {
      // 右滑

      // 获取最大可移动距离
      let maxRightDistance = this.getSliderMoveableDistance('first')

      // 距离最右边的初始值
      if(_sliderLeftInitial >= maxRightDistance) {
        this.distance.firstSliderLeftInitial = maxRightDistance
      } else {
        this.distance.firstSliderLeftInitial = _sliderLeftInitial
      }
    }

    // 触发滑动结束
    this.props.sliderMoveEnd()
  }

  // 第二个滑块滑动的时候
  handleSecondSliderPanResponderMove = (e, gestureState) => {
    const { dx } = gestureState
    // 滑动前距离左边的距离
    const { secondSliderLeftInitial } = this.distance
    // 滑动过程中的距离
    const temDistance = secondSliderLeftInitial + Math.round(dx)

    // 右滑判断右边距
    if(temDistance > secondSliderLeftInitial) {
      //获取最大可移动距离
      let moveableDistance = this.getSliderMoveableDistance('second')

      // 滑动之后的值不能大于超出父容器
      if(temDistance <= moveableDistance) {
        this.setSecondSliderLeft(temDistance)
      } else {
        // 小于初始值就设置为初始值
        this.setSecondSliderLeft(moveableDistance)
      }
    } else {
      // 左滑判断左边距
      // 滑动之后的值不能小于距离左边初始值
      if(temDistance >= 0 ) {
        this.setSecondSliderLeft(temDistance)
      } else {
        // 小于初始值就设置为初始值
        this.setSecondSliderLeft(0)
      }
    }
  }

  // 第二个滑块放开的时候
  handleSecondSliderPanResponderRelease = (e, gestureState) => {
    // 记录滑动过后的值
    const { secondSliderLeftInitial } = this.distance
    // 计算滑动过后应该重新设置初始值
    const _sliderLeftInitial = secondSliderLeftInitial + gestureState.dx

    // 左滑
    if(_sliderLeftInitial <= secondSliderLeftInitial) {
      // 距离最左边的初始值
      if(_sliderLeftInitial < 0) {
        this.distance.secondSliderLeftInitial = 0
      } else {
        this.distance.secondSliderLeftInitial = _sliderLeftInitial
      }
    } else {
      // 右滑
      // 获取最大可移动距离
      let maxRightDistance = this.getSliderMoveableDistance('second')

      // 距离最右边的初始值
      if(_sliderLeftInitial >= maxRightDistance) {
        this.distance.secondSliderLeftInitial = maxRightDistance
      } else {
        this.distance.secondSliderLeftInitial = _sliderLeftInitial
      }
    }

    // 触发滑动结束
    this.props.sliderMoveEnd()
  }

  // 设置第一个滑块距离左边的距离
  setFirstSliderLeft = (left) => {
    // 设置第一个滑块距离左边的距离，然后计算变化的价格
    this.setState({ firstSliderLeft: left }, this.computePrice)
  }

  // 设置第二个滑块距离左边的距离
  setSecondSliderLeft = (left) => {
    // 设置第二个滑块距离左边的距离，然后计算变化的价格
    this.setState({ secondSliderLeft: left }, this.computePrice)
  }

  // New：使用固定块来获取可移动距离
  getSliderMoveableDistance = () => {
    const { moveableDistance } = this.distance
    return moveableDistance
  }

  // 计算价格的变化。反馈到父组件
  computePrice = () => {
    const { firstSliderLeft, secondSliderLeft } = this.state
    const { pricePerPx } = this.distance

    const slideMinPrice = Math.min(firstSliderLeft, secondSliderLeft) * pricePerPx
    const slideMaxPrice = Math.max(firstSliderLeft, secondSliderLeft) * pricePerPx

    this.props.onMoveChange({
      min: slideMinPrice,
      max: slideMaxPrice
    })
  }

  // 获取连线位置信息
  getLeftAndRight = () => {
    const { firstSliderLeft, secondSliderLeft, sliderWidth } = this.state

    // 滑块的一半
    const halfWidth = (!sliderWidth || sliderWidth == 0) ? 0 : sliderWidth / 2

    // 左边滑块距离左边的距离
    const left = Math.min(firstSliderLeft, secondSliderLeft) + halfWidth

    // 可移动距离
    let moveableDistance = this.getSliderMoveableDistance()

    // 右边滑块距离右边的距离
    const right = moveableDistance - Math.max(firstSliderLeft, secondSliderLeft) + halfWidth

    return {
      left: utils.getDpx(left * utils.getDpr()),
      right: utils.getDpx(right * utils.getDpr()),
    }
  }

  // 初始化设置样式
  initialStyle = () => {
    const { sliderWidth, wrapHeight } = this.state
    if(!sliderWidth || !wrapHeight) return

    const { backgroundBarStyle, frontBarStyle } = this.props

    const sliderHalfWidth = sliderWidth / 2

    // 背景条高度
    const bgBarHeight = wrapHeight / 2 - (backgroundBarStyle.height || 0) / 2

    // 连线条高度
    const frontBarHeight = wrapHeight / 2 - (frontBarStyle.height || 0) / 2

    // 样式
    const barStyles = StyleSheet.create({
      backgroundBarStyle: {
        backgroundColor: '',
        ...backgroundBarStyle,
        position: 'absolute',
        top: bgBarHeight,
        right: 0,
        bottom: 0,
        left: 0,
      },
      computeBarStyle: {
        position: 'absolute',
        height: 0,
        top: 0,
        right: sliderHalfWidth,
        bottom: 0,
        left: sliderHalfWidth,
      },
      frontBarStyle: {
        ...frontBarStyle,
        top: frontBarHeight,
        position: 'absolute',
      }
    })

    this.setState({
      backgroundBarStyle: barStyles.backgroundBarStyle,
      computeBarStyle: barStyles.computeBarStyle,
      frontBarStyle: barStyles.frontBarStyle,
    })
  }

  // 获取滑块的大小。获取之后计算初始背景样式
  getSliderSize = (e) => {
    let { width, height } = e.nativeEvent.layout

    // 设置滑块宽度
    this.setState({
      sliderWidth: width,
      sliderHeight: height,
      wrapHeight: height,
    }, this.initialStyle)
  }

  // 使用固定块来计算可移动宽度
  bgWidthLayout = (e) => {
    // 获取到固定块宽度后计算价格
    const { width } = e.nativeEvent.layout
    this.distance.moveableDistance = width

    this.computePerPrice()
  }

  // 代码优化计算每次移动位置价格变化基数。根据传入props设置滑动条初始值
  computePerPrice = () => {
    // 可移动距离
    let moveableDistance = this.getSliderMoveableDistance()

    // 没有获取到可移动距离
    if (!moveableDistance) return


    const { min, max } = this.props

    //滑块中点开始计算
    const _pricePerPx = (max - min) / moveableDistance

    this.distance.pricePerPx = _pricePerPx

    // 计算初滑块始化位置
    const { defaultMin, defaultMax } = this.props

    const sliderFristInitialLeft = Math.round(defaultMin / _pricePerPx)
    const sliderSecondInitialLeft = Math.round(defaultMax / _pricePerPx)

    this.distance.firstSliderLeftInitial = sliderFristInitialLeft
    this.distance.secondSliderLeftInitial = sliderSecondInitialLeft

    // 更新初始值
    this.setState({
      firstSliderLeft: this.distance.firstSliderLeftInitial,
      secondSliderLeft: this.distance.secondSliderLeftInitial,
    })
  }

  componentWillMount() {
    // 第一个滑块处理
    this.firstSliderPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this.handleMoveShouldSetPanResponder,
      onPanResponderMove: this.handleFirstSliderPanResponderMove,
      onPanResponderRelease: this.handleFirstSliderPanResponderRelease
    })

    // 第二个滑块处理
    this.secondSliderPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this.handleMoveShouldSetPanResponder,
      onPanResponderMove: this.handleSecondSliderPanResponderMove,
      onPanResponderRelease: this.handleSecondSliderPanResponderRelease
    })
  }

  render() {
    const { 
      firstSliderLeft, secondSliderLeft,
      computeBarStyle, backgroundBarStyle,
      frontBarStyle, wrapHeight
    } = this.state

    const { getSlider  } = this.props

    return (
      <View
        style={[
          styles.slideWrap,
          { height: wrapHeight }
        ]}
        onLayout={this.sliderWrapLayout}
      >
        <View
          style={backgroundBarStyle}
        />
        <View
          style={computeBarStyle}
          onLayout={this.bgWidthLayout}
        />
        <View style={[
          frontBarStyle,
          { ...this.getLeftAndRight() }]} />
        <View
          style={[
            styles.sliderItemWrap,
            { left: utils.getDpx(firstSliderLeft * utils.getDpr()) }
          ]}
          {...this.firstSliderPanResponder.panHandlers}
          onLayout={this.getSliderSize}
        >
          {getSlider()}
        </View>
        <View
          style={[
            styles.sliderItemWrap,
            { left: utils.getDpx(secondSliderLeft * utils.getDpr()) }
          ]}
          {...this.secondSliderPanResponder.panHandlers}
        >
          {getSlider()}
        </View>
      </View>
    )
  }
}

export default PriceSlider
