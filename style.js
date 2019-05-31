import { StyleSheet } from 'react-native'
import * as utils from './utils'

const styles = StyleSheet.create({
  slideWrap: {
    backgroundColor: '#fca',
    position: 'relative',
    width: '100%',
    marginTop: utils.getRpx(35)
  },
  sliderCountBg: {
    backgroundColor: '#F0F2F5',
    position: 'absolute',
    height: utils.getRpx(4),
    top: utils.getRpx(26),
    left: utils.getRpx(28),
    right: utils.getRpx(28),
  },
  sliderCount: {
    backgroundColor: '#FFAC00',
    position: 'absolute',
    height: utils.getRpx(4),
    top: utils.getRpx(26),
    left: utils.getRpx(128),
    right: utils.getRpx(128),
  },
  sliderItemWrap: {
    position: 'absolute',
  },
  sliderImg: {
    width: utils.getRpx(56),
    height: utils.getRpx(56),
  }
})

export default styles
