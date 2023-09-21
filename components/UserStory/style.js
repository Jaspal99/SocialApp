import {horizontalScale, scaleFontSize} from '../../assets/styles/scalling';

const {StyleSheet, Platform} = require('react-native');

const style = StyleSheet.create({
  storyContainer: {
    marginHorizontal: horizontalScale(9),
    padding: horizontalScale(5),
  },
  name: {
    textAlign: 'center',
    fontFamily: 'Inter',
    fontWeight: Platform.OS === 'ios' ? '500' : '700',
    fontSize: scaleFontSize(14),
    lineHeight: scaleFontSize(17),
    marginTop: horizontalScale(8),
    color: 'black',
  },
  userImageContainer: {
    borderWidth: 1,
    borderColor: '#F35BAC',
    padding: 3,
    borderRadius: 50,
  },
});
export default style;
