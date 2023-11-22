import axios from 'axios';
import React, {useRef, useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {PermissionsAndroid, Platform} from 'react-native';
import {
  ClientRoleType,
  createAgoraRtcEngine,
  IRtcEngine,
  RtcSurfaceView,
  ChannelProfileType,
} from 'react-native-agora';
import base64 from 'base-64';
const appId = 'a64ea0ef69c3491db821c412bd8ef2c7';
const channelName = 'SocialApp';
const token =
  '007eJxTYNjfuEP6tYSw478P8xK/7XuXvtzRPuG1n1Kae0pbWWas2i8FhkQzk9REg9Q0M8tkYxNLw5QkCyPDZBNDo6QUi9Q0o2RzvQOxqQ2BjAxu0neYGBkgEMTnZAjOT85MzHEsKGBgAAA17SGx';
const uid = 1;

const VideoCall = () => {
  const agoraEngineRef = useRef(); // Agora engine instance
  const [isJoined, setIsJoined] = useState(false); // Indicates if the local user has joined the channel
  const [remoteUid, setRemoteUid] = useState(0); // Uid of the remote user
  const [message, setMessage] = useState(''); // Message to the user

  const getPermission = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);
    }
  };

  function showMessage(msg) {
    setMessage(msg);
  }

  const join = async () => {
    if (isJoined) {
      return;
    }
    try {
      agoraEngineRef.current?.setChannelProfile(
        ChannelProfileType.ChannelProfileCommunication,
      );
      agoraEngineRef.current?.startPreview();
      agoraEngineRef.current?.joinChannel(token, channelName, uid, {
        clientRoleType: ClientRoleType.ClientRoleBroadcaster,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const leave = () => {
    try {
      agoraEngineRef.current?.leaveChannel();
      setRemoteUid(0);
      setIsJoined(false);
      showMessage('You left the channel');
    } catch (e) {
      console.log(e);
    }
  };

  const getChannelDetails = async () => {
    const username = '1bd095449e7b45d89008e9fa8187869a';
    const password = '9e0aa60155b3496b991fcbc9255b8aad';
    // const res = await axios.get(
    //   ,
    //   {
    //     // Axios looks for the `auth` option, and, if it is set, formats a
    //     // basic auth header for you automatically.
    //     auth: {
    //     },
    //   },
    // );
    try {
      const response = await fetch(
        `https://api.agora.io/dev/v1/project?id=a64ea0ef69c3491db821c412bd8ef2c7&name=SocialApp`,
        {
          headers: {
            Authorization: 'Basic ' + base64.encode(username + ':' + password),
          },
        },
      );
      data = await response.json();

      console.log('channel stats', data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Initialize Agora engine when the app starts
    setupVideoSDKEngine();
    getChannelDetails();
  });

  const setupVideoSDKEngine = async () => {
    try {
      // use the helper function to get permissions
      if (Platform.OS === 'android') {
        await getPermission();
      }
      agoraEngineRef.current = createAgoraRtcEngine();
      const agoraEngine = agoraEngineRef.current;
      agoraEngine.registerEventHandler({
        onJoinChannelSuccess: () => {
          showMessage('Successfully joined the channel ' + channelName);
          setIsJoined(true);
        },
        onUserJoined: (_connection, Uid) => {
          showMessage('Remote user joined with uid ' + Uid);
          setRemoteUid(Uid);
        },
        onUserOffline: (_connection, Uid) => {
          showMessage('Remote user left the channel. uid: ' + Uid);
          setRemoteUid(0);
        },
      });
      agoraEngine.initialize({
        appId: appId,
        channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
      });
      agoraEngine.enableVideo();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.main}>
      <Text style={styles.head}>Agora Video Calling Quickstart</Text>
      <View style={styles.btnContainer}>
        <Text onPress={join} style={styles.button}>
          Join
        </Text>
        <Text onPress={leave} style={styles.button}>
          Leave
        </Text>
      </View>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContainer}>
        {isJoined ? (
          <React.Fragment key={0}>
            <RtcSurfaceView canvas={{uid: 0}} style={styles.videoView} />
            <Text>Local user uid: {uid}</Text>
          </React.Fragment>
        ) : (
          <Text>Join a channel</Text>
        )}
        {isJoined && remoteUid !== 0 ? (
          <React.Fragment key={remoteUid}>
            <RtcSurfaceView
              canvas={{uid: remoteUid}}
              style={styles.videoView}
            />
            <Text>Remote user uid: {remoteUid}</Text>
          </React.Fragment>
        ) : (
          <Text>Waiting for a remote user to join</Text>
        )}
        <Text style={styles.info}>{message}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 25,
    paddingVertical: 4,
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#0055cc',
    margin: 5,
  },
  main: {flex: 1, alignItems: 'center'},
  scroll: {flex: 1, backgroundColor: '#ddeeff', width: '100%'},
  scrollContainer: {alignItems: 'center'},
  videoView: {width: '90%', height: 200},
  btnContainer: {flexDirection: 'row', justifyContent: 'center'},
  head: {fontSize: 20},
  info: {backgroundColor: '#ffffe0', color: '#0000ff'},
});

export default VideoCall;
