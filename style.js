import { StyleSheet } from 'react-native'
import * as utils from './utils'

const styles = StyleSheet.create({
  slideWrap: {
    position: 'relative',
    width: '100%',
    marginTop: utils.getRpx(35)
  },
  sliderItemWrap: {
    position: 'absolute',
  },
  sliderStyle: {
    backgroundColor: '#33ddcc',
    borderRadius: utils.getRpx(28),
    width: utils.getRpx(56),
    height: utils.getRpx(56)
  }
})

export default styles
