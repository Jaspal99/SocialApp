import {Image, Text, View} from 'react-native';
import PropType from 'prop-types';
import style from './style';
export default function UserStory(prop) {
  return (
    <View style={style.storyContainer}>
      <View style={style.userImageContainer}>
        <Image source={require('../../assets/images/default_profile.png')} />
      </View>
      <Text style={style.name}>{prop.firstName}</Text>
    </View>
  );
}
UserStory.prototype = {
  firstName: PropType.string.isRequired,
};
