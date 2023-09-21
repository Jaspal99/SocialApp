import {horizontalScale} from '../../assets/styles/scalling';

const {StyleSheet} = require('react-native');

const style = StyleSheet.create({
  userImageContainer: {
    borderWidth: 1,
    borderColor: '#F35BAC',
    padding: horizontalScale(2.5),
    borderRadius: horizontalScale(50),
  },
});
export default style;
