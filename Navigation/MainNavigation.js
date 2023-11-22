import {createStackNavigator} from '@react-navigation/stack';
import Home from '../Screens/Home/Home';
import Profile from '../Screens/Profile/Profile';
import {Routes} from './Routes';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Text, View} from 'react-native';
import ProfileTabTitle from '../components/ProfileTabTitle/ProfileTabTitle';
import ProfileTabPost from '../components/ProfileTabPost/ProfileTabPost';
import VideoCall from '../Screens/VideoCall/VideoCall';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const ProfileTabs = createMaterialTopTabNavigator();

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
