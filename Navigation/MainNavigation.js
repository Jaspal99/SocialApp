import {createStackNavigator} from '@react-navigation/stack';
import Home from '../Screens/Home/Home';
import Profile from '../Screens/Profile/Profile';
import {Routes} from './Routes';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Alert, PermissionsAndroid, Text, View} from 'react-native';
import ProfileTabTitle from '../components/ProfileTabTitle/ProfileTabTitle';
import ProfileTabPost from '../components/ProfileTabPost/ProfileTabPost';
import VideoCall from '../Screens/VideoCall/VideoCall';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
// import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const ProfileTabs = createMaterialTopTabNavigator();

// PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATION);

export const ProfileTabNavigator = () => {
  return (
    <ProfileTabs.Navigator
      screenOptions={{
        tabBarIndicatorStyle: {
          backgroundColor: 'transparent',
        },
        tabBarStyle: {
          elevation: 0,
          zIndex: 0,
        },
      }}>
      <ProfileTabs.Screen
        name={'Tab1'}
        component={ProfileTabPost}
        options={{
          tabBarLabel: ({focused}) => {
            return <ProfileTabTitle title={'Photos'} isFocused={focused} />;
          },
        }}
      />
      <ProfileTabs.Screen
        name={'Tab2'}
        component={ProfileTabPost}
        options={{
          tabBarLabel: ({focused}) => {
            return <ProfileTabTitle title={'Videos'} isFocused={focused} />;
          },
        }}
      />
      <ProfileTabs.Screen
        name={'Tab3'}
        component={ProfileTabPost}
        options={{
          tabBarLabel: ({focused}) => {
            return <ProfileTabTitle title={'Saved'} isFocused={focused} />;
          },
        }}
      />
    </ProfileTabs.Navigator>
  );
};

const MainMenuNavigation = () => {
  // const dispatch = useDispatch();
  // const navigation = useNavigation();
  // const checkToken = async () => {
  //   try {
  //     const token = await messaging().getToken();
  //     console.log(token);
  //     await AsyncStorage.setItem('deviceID', token);
  //   } catch (e) {
  //     console.log('error while fetching token', e);
  //   }
  // };

  // useEffect(() => {
  //   messaging().onNotificationOpenedApp(remoteMessage => {
  //     //background state
  //     console.log('background message', remoteMessage?.data);
  //     //dispatch value of notification data to be used in another components

  //     //set notification to make user redirect to particular screen when opening through notification

  //     // navigation.navigate('HomeScreen',{
  //     //   screen:'Feed',
  //     //   params:{
  //     //     screen:'MessageStack',
  //     //     params:{
  //     //       screen:'IncomingCallScreen'
  //     //     }
  //     //   }
  //     // })

  //     //message through quit state
  //     messaging()
  //       .getInitialNotification()
  //       .then(remoteMessage => {
  //         if (remoteMessage) {
  //           console.log('notification of quit state', remoteMessage?.data);
  //           // similarly handle dispatch and navigation
  //         }
  //       });
  //   });

  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     console.log('notification from foreground', remoteMessage);
  //     Alert.alert(
  //       remoteMessage?.notification?.title,
  //       remoteMessage?.notification?.body,
  //     );

  //     //similar dispatch and navigation
  //   });
  //   return unsubscribe;
  // }, []);

  // useEffect(() => {
  //   checkToken();
  // }, []);

  return (
    <Drawer.Navigator
      screenOptions={{
        header: () => null,
      }}>
      <Drawer.Screen name={Routes.Home} component={Home} />
      <Drawer.Screen name={Routes.Profile} component={Profile} />
      <Drawer.Screen name={Routes.VideoCall} component={VideoCall} />
    </Drawer.Navigator>
  );
};

const MainNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.Home}
      screenOptions={{
        header: () => null,
        headerShown: false,
      }}>
      <Stack.Screen name={'Drawer'} component={MainMenuNavigation} />
    </Stack.Navigator>
  );
};
export default MainNavigation;
