import {Platform, StyleSheet} from 'react-native';
import {horizontalScale, scaleFontSize} from '../../assets/styles/scalling';
const style = StyleSheet.create({
  title: {
    fontFamily: 'Inter',
    fontWeight: Platform.OS === 'ios' ? '600' : '700',
    fontSize: scaleFontSize(24),
    lineHeight: scaleFontSize(29),
    color: 'black',
    marginHorizontal: horizontalScale(4),
  },
});
export default style;
