import axios from 'axios';
import React, {useRef, useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {PermissionsAndroid, Platform} from 'react-native';
import {
  ClientRoleType,
  createAgoraRtcEngine,
  IRtcEngine,
  RtcSurfaceView,
  ChannelProfileType,
} from 'react-native-agora';
import base64 from 'base-64';
import {FaSymbol} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faBookmark,
  faComment,
  faEye,
  faHeart,
} from '@fortawesome/free-regular-svg-icons';
import {
  faArrowsLeftRight,
  faEyeDropper,
  faEyeSlash,
  faMicrophone,
  faPhone,
  faVideoCamera,
} from '@fortawesome/free-solid-svg-icons';
const appId = 'a64ea0ef69c3491db821c412bd8ef2c7';
const channelName = 'SocialApp';
const token =
  '007eJxTYND8IMjrIaVkvt8i7fU8p2di2f93PojcuXrnp1OXnX8c+FatwJBoZpKaaJCaZmaZbGxiaZiSZGFkmGxiaJSUYpGaZpRsbtuTk9oQyMiwMlmPgREKQXxOhuD85MzEHMeCAgYGAGiAIus=';
const uid = Math.floor(Math.random() * 100000);

const VideoCall = () => {
  const agoraEngineRef = useRef(); // Agora engine instance
  const [isJoined, setIsJoined] = useState(false); // Indicates if the local user has joined the channel
  const [remoteUid, setRemoteUid] = useState(0); // Uid of the remote user
  const [message, setMessage] = useState(''); // Message to the user
  const [isVideo, setIsVideo] = useState(false);
  const [isAudio, setIsAudio] = useState(false);
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

  const sendNotification = async () => {
    //get device token to send notification to user
    const token = route?.item?.deviceId;
    // user name of receiver
    const senderName = 'Default user';
    var currData = JSON.stringify({
      data: {
        //dta to send via notification
        moduleTitle: 'agora',
        channelName: 'VideoCallApp',
        token: 'some agora token',
        callerName: senderName,
      },
      notification: {
        body: `message from ${senderName}`,
        title: 'New Message',
      },
      to: token,
    });
    const FIREBASE_SERVER_KEY = 'firebase server key store in const file';
    var config = {
      method: 'POST',
      url: 'https://fcm.googleapis.com/fcm/send',
      headers: {
        Authorization: `key=${FIREBASE_SERVER_KEY}`,
        'Content-Type': 'application/json',
      },
      data: currData,
    };
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleMicChange = () => {
    if (isAudio) {
      agoraEngineRef.current.disableAudio();
    } else {
      agoraEngineRef.current.enableAudio();
    }
    setIsAudio(!isAudio);
  };

  const handleVideoChange = async () => {
    if (isVideo) {
      agoraEngineRef.current.disableVideo();
      agoraEngineRef.current.stopPreview();
    } else {
      agoraEngineRef.current.enableVideo();
      agoraEngineRef.current.startPreview();
    }
    setIsVideo(!isVideo);
  };
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
      setIsJoined(true);
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

  const switchCam = () => {
    agoraEngineRef.current.switchCamera();
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
            <View
              style={{
                width: '100%',
                padding: 0,
                margin: 0,
                justifyContent: 'center',
                alignItems: 'center',
                // backgroundColor: 'yellow',
              }}>
              {isVideo ? (
                <RtcSurfaceView canvas={{uid: 0}} style={styles.videoView} />
              ) : (
                <View
                  style={{
                    width: '90%',
                    height: 500,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'gray',
                  }}>
                  <FontAwesomeIcon size={50} icon={faEyeSlash} />
                </View>
              )}

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  width: '90%',
                  height: 70,
                  alignItems: 'center',
                  backgroundColor: 'lightblue',
                }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: isAudio ? 'black' : 'gray',
                    padding: 10,
                    borderRadius: 50,
                  }}
                  onPress={handleMicChange}>
                  <FontAwesomeIcon
                    icon={faMicrophone}
                    size={25}
                    color="white"
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    backgroundColor: isVideo ? 'black' : 'gray',
                    padding: 10,
                    borderRadius: 50,
                  }}
                  onPress={handleVideoChange}>
                  <FontAwesomeIcon
                    icon={faVideoCamera}
                    size={25}
                    color="white"
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    backgroundColor: 'black',
                    padding: 10,
                    borderRadius: 50,
                  }}
                  onPress={switchCam}>
                  <FontAwesomeIcon
                    icon={faArrowsLeftRight}
                    size={25}
                    color="white"
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    backgroundColor: 'red',
                    padding: 10,
                    borderRadius: 50,
                  }}
                  onPress={leave}>
                  <FontAwesomeIcon icon={faPhone} size={25} color="white" />
                </TouchableOpacity>
              </View>
            </View>

            {/* <Text>Local user uid: {uid}</Text> */}
          </React.Fragment>
        ) : (
          <Text>Join a channel</Text>
        )}
        {isJoined && remoteUid !== 0 ? (
          <View
            style={{
              position: 'absolute',
              width: 200,
              height: 200,
              top: 1,
              right: 1,
            }}
            key={remoteUid}>
            <RtcSurfaceView
              canvas={{uid: remoteUid}}
              style={{
                width: 197,
                height: 197,
              }}
            />
            <Text>Remote user uid: {remoteUid}</Text>
          </View>
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
  videoView: {width: '90%', height: 500},
  remoteView: {width: 200, height: 200},
  btnContainer: {flexDirection: 'row', justifyContent: 'center'},
  head: {fontSize: 20},
  info: {backgroundColor: '#ffffe0', color: '#0000ff'},
});

export default VideoCall;
