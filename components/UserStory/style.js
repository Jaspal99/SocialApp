const {StyleSheet, Platform} = require('react-native');

const style = StyleSheet.create({
  storyContainer: {
    marginRight: 20,
  },
  name: {
    textAlign: 'center',
    fontFamily: 'Inter',
    fontWeight: Platform.OS === 'ios' ? '500' : '700',
    fontSize: 14,
    lineHeight: 17,
    marginTop: 8,
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
