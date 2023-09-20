import {Image, Text, View} from 'react-native';
import PropType from 'prop-types';
import style from './style';
import UserProfileImage from '../UserProfileImage/UserProfileImage';
export default function UserStory(prop) {
  return (
    <View style={style.storyContainer}>
      <UserProfileImage />
      <Text style={style.name}>{prop.firstName}</Text>
    </View>
  );
}
UserStory.prototype = {
  firstName: PropType.string.isRequired,
};
