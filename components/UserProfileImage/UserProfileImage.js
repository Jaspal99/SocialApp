import {Image, View} from 'react-native';
import style from './style';

export default function UserProfileImage() {
  return (
    <View style={style.userImageContainer}>
      <Image source={require('../../assets/images/default_profile.png')} />
    </View>
  );
}
