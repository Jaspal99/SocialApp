import {Platform, StyleSheet} from 'react-native';
const style = StyleSheet.create({
  title: {
    fontFamily: 'Inter',
    fontWeight: Platform.OS === 'ios' ? '600' : '700',
    fontSize: 24,
    lineHeight: 29,
    color: 'black',
  },
});
export default style;
