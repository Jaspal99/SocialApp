import {Image, View} from 'react-native';
import style from './style';

export default function UserProfileImage(prop) {
  return (
    <View style={style.userImageContainer}>
      {/* <Image source={require('../../assets/images/default_profile.png')} /> */}
      <Image
        source={
          prop.image
            ? {uri: prop.image}
            : require('../../assets/images/default_profile.png')
        }
        style={style.imageStory}
      />
    </View>
  );
}
