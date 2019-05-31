/**
 * @format
 */

import 'react-native';
import React from 'react';
import { View } from 'react-native'
import RangeSelector from '../index';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const backgroundBarStyle = {
    backgroundColor: '#F0F2F5',
    height: 3,
  }

  const frontBarStyle = {
    backgroundColor: '#55aaff',
    height: 3,
  }

  const SliderStyle = {
    width: 28,
    height: 28,
  }

  renderer.create(<RangeSelector
    min={0}
    max={100}
    defaultMin={0}
    defaultMax={100}
    getSlider={() => (<View style={SliderStyle} />)}
    onMoveChange={({min, max}) => {console.log(`min: ${min}, max: ${max}`)}}
    sliderMoveStart={({min, max}) => {console.log(`min: ${min}, max: ${max}`)}}
    sliderMoveEnd={({min, max}) => {console.log(`min: ${min}, max: ${max}`)}}
    backgroundBarStyle={backgroundBarStyle}
    frontBarStyle={frontBarStyle}
  />);
});
