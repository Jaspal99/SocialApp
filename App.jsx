/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
// import type {PropsWithChildren} from 'react';
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




function App() {
  const data = [
    {
      name:"Jaspal",
      id:1
    },{
      name:"Gagan",
      id:2
    },{
      name:"Ajeet",
      id:3
    },{
      name:"Jai",
      id:4
    },{
      name:"Deep",
      id:5
    },{
      name:"Sunder",
      id:6
    },{
      name:"Simran",
      id:7
    },{
      name:"Ishmeet",
      id:8
    },{
      name:"Bhavneet",
      id:9
    },{
      name:"Tanishq",
      id:10
    },{
      name:"Sarfraz",
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
      image:''
    },
    {
      firstName:'Abhishek',
      lastName:'Ojha',
      location:'Delhi',
      likes:423,
      comments:23,
      bookmarks:2,
      id:2,
      image:''
    },
    {
      firstName:'Angad',
      lastName:'Singh',
      location:'Punjab',
      likes:1300,
      comments:423,
      bookmarks:5,
      id:3,
      image:''
    },
    {
      firstName:'Gagandeep',
      lastName:'Singh',
      location:'Gurgaon',
      likes:1,
      comments:0,
      bookmarks:0,
      id:4,
      image:''
    },
    {
      firstName:'Bhavneet',
      lastName:'Singh',
      location:'Banglore',
      likes:1290,
      comments:1234,
      bookmarks:64,
      id:5,
      image:''
    },
    {
      firstName:'Deepanshu',
      lastName:'Solanki',
      location:'Shimla',
      likes:499,
      comments:23,
      bookmarks:0,
      id:6,
      image:''
    }
  ]
  const pageSize = 4;
  const postPageSize = 2;
  const [pageNumber,setPageNumber] = useState(1)
  const [postPageNumber,setPostPageNumber] = useState(1)
  const [isLoading,setIsLoading] = useState(false)
  const [isLoadingPosts,setIsLoadingPosts] = useState(false)
  const [renderedData,setRenderedData] = useState(data.slice(0,pageSize))
  const [renderedDataPosts,setRenderedDataPosts] = useState(posts.slice(0,pageSize))
  const  pagination = (data,pageNumber,pageSize,posts=false) =>{
    let startIndex = (pageNumber  -  1)*pageSize;
    if(startIndex > data.length)return [];
    if(!posts) setPageNumber(pageNumber)
    else setPostPageNumber(pageNumber)
    return data.slice(startIndex,startIndex+pageSize)
  }
  return (
    <SafeAreaView>
      <ScrollView>
      <View style={style.header}>
      <Title title={"Let's Explore"}/>
      <Pressable style={style.messageIcon}>
      <FontAwesomeIcon icon={faEnvelope} color={'#CACDDE'} size={20}/>
      <View style={style.messageNumberContainer}>
        <Text style={style.messageNumber}>2</Text>
      </View>
      </Pressable>
      </View>
      <View style={style.userStoriesContainer}>
        <FlatList 
        onEndReachedThreshold={0.5}
        keyExtractor={item=>item.id.toString()}
        onEndReached={()=>{
          if(!isLoading){
            setIsLoading(true);
            setRenderedData(prev=>[
              ...prev,
              ...pagination(data,pageNumber+1,pageSize)
            ])
            setIsLoading(false);
          }
        }}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={renderedData} renderItem={({item})=><UserStory firstName={item.name} />} />
      </View>
      <View style={style.userPostContainer}>
      <FlatList 
        onEndReachedThreshold={0.5}
        keyExtractor={item=>item.id.toString()}
        onEndReached={()=>{
          if(!isLoadingPosts){
            setIsLoadingPosts(true);
            setRenderedDataPosts(prev=>[
              ...prev,
              ...pagination(posts,pageNumber+1,pageSize,true)
            ])
            setIsLoadingPosts(false);
          }
        }}
        showsVerticalScrollIndicator={false}
        // horizontal
        data={renderedDataPosts} renderItem={({item})=><UserPost 
        firstName={item.firstName}
        lastName={item.lastName}
        comments={item.comments}
        likes={item.likes}
        bookmarks={item.bookmarks}
        location={item.location}
        image={item.image} />} />
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
