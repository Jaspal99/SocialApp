/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Title from './components/Title/Title';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import style from './assets/styles/main';
import UserStory from './components/UserStory/UserStory';
import UserPost from './components/UserPost/UserPost';
import { NavigationContainer } from '@react-navigation/native';




function App() {
  const data = [
    {
      firstName:"Jaspal",
      id:1
    },{
      firstName:"Gagan",
      id:2
    },{
      firstName:"Ajeet",
      id:3
    },{
      firstName:"Jai",
      id:4
    },{
      firstName:"Deep",
      id:5
    },{
      firstName:"Sunder",
      id:6
    },{
      firstName:"Simran",
      id:7
    },{
      firstName:"Ishmeet",
      id:8
    },{
      firstName:"Bhavneet",
      id:9
    },{
      firstName:"Tanishq",
      id:10
    },{
      firstName:"Sarfraz",
      id:11
    },
  ]  
  const posts = [
    {
      firstName:'Jaspal',
      lastName:'Singh',
      location:'Delhi',
      likes:1200,
      comments:123,
      bookmarks:4,
      id:1,
    },
    {
      firstName:'Abhishek',
      lastName:'Ojha',
      location:'Delhi',
      likes:423,
      comments:23,
      bookmarks:2,
      id:2,
    },
    {
      firstName:'Angad',
      lastName:'Singh',
      location:'Punjab',
      likes:1300,
      comments:423,
      bookmarks:5,
      id:3,
    },
    {
      firstName:'Gagandeep',
      lastName:'Singh',
      location:'Gurgaon',
      likes:1,
      comments:0,
      bookmarks:0,
      id:4,
    },
    {
      firstName:'Bhavneet',
      lastName:'Singh',
      location:'Banglore',
      likes:1290,
      comments:1234,
      bookmarks:64,
      id:5,
    },
    {
      firstName:'Deepanshu',
      lastName:'Solanki',
      location:'Shimla',
      likes:499,
      comments:23,
      bookmarks:0,
      id:6,
    }
  ]
  const pageSize = 4;
  const pageSizePosts = 2;

  const [pageNumber, setPageNumber] = useState(1);
  const [postPageNumber, setPostPageNumber] = useState(1);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);

  const [renderedData, setRenderedData] = useState(data.slice(0, pageSize));
  const [renderedDataPosts, setRenderedDataPosts] = useState(
    posts.slice(0, pageSizePosts),
  );

  const pagination = (data, pageNumber, pageSize, posts = false) => {
    let startIndex = (pageNumber - 1) * pageSize;
    if (startIndex >= data.length) {
      return [];
    }
    
    if (!posts) {
      setPageNumber(pageNumber);
    } else {
      setPostPageNumber(pageNumber);
    }
    
    return data.slice(startIndex, startIndex + pageSize);
  };

  return (
    <NavigationContainer>
    <SafeAreaView>
      <FlatList
        ListHeaderComponent={
          <>
            <View style={style.header}>
              <Title title={"Let's Explore"} />
              <Pressable style={style.messageIcon}>
                <FontAwesomeIcon
                  icon={faEnvelope}
                  color={'#CACDDE'}
                  size={20}
                />
                <View style={style.messageNumberContainer}>
                  <Text style={style.messageNumber}>2</Text>
                </View>
              </Pressable>
            </View>
            <View style={style.userStoryContainer}>
              <FlatList
                onMomentumScrollBegin={() => setIsLoadingPosts(false)}
                onEndReachedThreshold={0.5}
                keyExtractor={item => item.id.toString()}
                onEndReached={() => {
                  if (!isLoading) {
                    setIsLoading(true);
                    setRenderedData(prev => [
                      ...prev,
                      ...pagination(data, pageNumber + 1, pageSize),
                    ]);
                    setIsLoading(false);
                  }
                }}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={renderedData}
                renderItem={({item}) => (
                  <UserStory firstName={item.firstName} />
                )}
              />
            </View>
          </>
        }
        onMomentumScrollBegin={() => setIsLoadingPosts(false)}
        onEndReachedThreshold={0.5}
        keyExtractor={item => item.id.toString() + 'post'}
        onEndReached={() => {
          if (!isLoadingPosts) {
            setIsLoadingPosts(true);
            setRenderedDataPosts(prev => [
              ...prev,
              ...pagination(posts, postPageNumber + 1, pageSizePosts, true),
            ]);
            setIsLoadingPosts(false);
          }
        }}
        showsVerticalScrollIndicator={false}
        data={renderedDataPosts}
        renderItem={({item}) => (
          <View style={style.userPostContainer}>
            <UserPost
              firstName={item.firstName}
              lastName={item.lastName}
              comments={item.comments}
              likes={item.likes}
              bookmarks={item.bookmarks}
              location={item.location}
            />
          </View>
        )}
      />
    </SafeAreaView>
    </NavigationContainer>
  );
};

export default App;