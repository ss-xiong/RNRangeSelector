# ReactNative RangeSelector
simple range selector for reactnative

---

![ReactNative RangeSelector](https://raw.githubusercontent.com/ss-xiong/reactnative-range-selector/master/ReactNative-RangeSelector.gif)

---

## Install
```bash
npm i -S reactnative-range-selector
```

## Usage
```javascript
import React, { Component } from 'react'
import { View } from 'react-native'
import RangeSelector from 'reactnative-range-selector'

class App extends Component {
  slideToChange = ({ min, max }) => {
    console.log(min, max)
  }

  render() {
    return (
      <View style={{widht: '100%'}}>
        <RangeSelector
          min={0}
          max={100}
          defaultMin={10}
          defaultMax={30}
          onMoveChange={this.slideToChangePrice}
        />
      </View>
    )
  }
}
```

## Property

RangeSelector provide default background bar, front bar and slider also. you can just props some a few of properites to use it.

### Basic use

* min: a number for selectable minimum
* max: a number for selectable maximun
* defaultMin: a number for default min value
* defaultMax: a number for default max value
* onMoveChange: a function with one object arguments contains `min` and `max` value on slider moving

### Custom component 

if default component is not you want, these component are all customlizable! some properties will be greatful.

* getSlider: a function return a component
* sliderMoveStart: a function with one object arguments contains `min` and `max` value on slider start move
* sliderMoveEnd: a function with one object arguments contains `min` and `max` value on slider end move
* backgroundBarStyle: a object with styles
* frontBarStyle: a object with styles


For all example:

```javascript
// ignore import
class App extends Component {
  slideToChange = ({ min, max }) => {
    console.log(min, max)
  }

  // function getSlider provide customlize slider
  getSlider = () => {
    return (<View />)
  }

  // function onSliderStart will emit on slide start
  onSliderStart = ({ min, max }) => {}

  // function onSliderEnd will emit on slide end
  onSliderEnd = ({ min, max }) => {}

  render() {

    // backgroundBarStyle provide background bar style.
    const backgroundBarStyle = {
      backgroundColor: '#F0F2F5',
      height: 6,
    }

    // frontBarStyle provide front bar style.
    const frontBarStyle = {
      backgroundColor: '#55aaff',
      height: 6,
    }

    return (
      <View style={{widht: '100%'}}>
        <RangeSelector
          min={0}
          max={100}
          defaultMin={10}
          defaultMax={30}
          onMoveChange={this.slideToChangePrice}
          getSlider={this.getSlider}
          sliderMoveStart={this.onSliderStart}
          sliderMoveEnd={this.onSliderEnd}
          backgroundBarStyle={backgroundBarStyle}
          frontBarStyle={frontBarStyle}
        />
      </View>
    )
  }
}
```

## FAQ
Any question please contact me. welcome star, welcome fork.