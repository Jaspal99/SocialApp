import {Platform, StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/styles/scalling';

const style = StyleSheet.create({
  name: {
    fontFamily: 'Inter',
    fontWeight: Platform.OS === 'ios' ? '500' : '700',
    fontSize: scaleFontSize(16),
    lineHeight: scaleFontSize(19),
    color: 'black',
  },
  location: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: scaleFontSize(12),
    lineHeight: scaleFontSize(15),
    padding: verticalScale(5),
    color: '#79869F',
  },
  userInformation: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userPostInformation: {
    marginLeft: horizontalScale(10),
  },
  image: {
    borderWidth: 1,
    borderColor: '#F35BAC',
    borderRadius: horizontalScale(50),
    padding: horizontalScale(3),
  },
  userInformationContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userPostContainer: {
    borderBottomWidth: 1,
    borderColor: '#EFF2F6',
  },
  userPostStatText: {
    color: '#79869F',
  },
  post: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: verticalScale(16),
  },
  userPostStats: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(30),
    paddingHorizontal: horizontalScale(10),
  },
  userPostStatButton: {
    marginRight: horizontalScale(27),
    flexDirection: 'row',
  },
  userPostStatIcon: {
    marginRight: horizontalScale(3),
    color: '#79869F',
  },
  imagePost: {
    width: '100%',
    height: 400,
  },
});

export default style;
