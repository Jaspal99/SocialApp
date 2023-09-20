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
  const pageSize = 4;
  const [pageNumber,setPageNumber] = useState(1)
  const [isLoading,setIsLoading] = useState(false)
  const [renderedData,setRenderedData] = useState([])
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
        showsHorizontalScrollIndicator={false}
        horizontal
        data={data} renderItem={({item})=><UserStory firstName={item.name} />} />
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
