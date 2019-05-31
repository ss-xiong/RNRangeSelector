import { Dimensions, PixelRatio, Platform } from 'react-native'

const dpr = parseInt(PixelRatio.get(), 10) || 1;

let { width, height } = Dimensions.get('screen')

if(Platform.OS === 'android') {
  if(width > height) {
    width = Dimensions.get('screen').height
    height = Dimensions.get('screen').width
  }
}

// get dpx
const getRpx = (length) => {
  return length * (width / 750)
}

// get dpx
const getDpx = (pix) => {
  return pix / dpr
}

const getDpr = () => {
  return dpr
}

export {
  getRpx,
  getDpx,
  getDpr
}