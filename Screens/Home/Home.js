import React, {useState} from 'react';
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
// import Title from './components/Title/Title';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEnvelope} from '@fortawesome/free-regular-svg-icons';
// import style from './assets/styles/main';
// import UserStory from './components/UserStory/UserStory';
// import UserPost from './components/UserPost/UserPost';
import {NavigationContainer} from '@react-navigation/native';
import style from './style';
import UserPost from '../../components/UserPost/UserPost';
import UserStory from '../../components/UserStory/UserStory';
import Title from '../../components/Title/Title';
import globalStyle from '../../assets/styles/main';
import {Routes} from '../../Navigation/Routes';
export default function Home({navigation}) {
  const data = [
    {
      firstName: 'Jaspal',
      id: 1,
      image:
        'https://images.unsplash.com/photo-1507697364665-69eec30ea71e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2371&q=80',
    },
    {
      firstName: 'Gagan',
      id: 2,
      image:
        'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    },
    {
      firstName: 'Ajeet',
      id: 3,
      image:
        'https://images.unsplash.com/photo-1515434126000-961d90ff09db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    },
    {
      firstName: 'Jai',
      id: 4,
      image:
        'https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    },
    {
      firstName: 'Deep',
      id: 5,
      image:
        'https://images.unsplash.com/photo-1542810634-71277d95dcbb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    },
    {
      firstName: 'Sunder',
      id: 6,
      image:
        'https://images.unsplash.com/photo-1632501641765-e568d28b0015?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
    },
    {
      firstName: 'Simran',
      id: 7,
      image:
        'https://images.unsplash.com/photo-1494199505258-5f95387f933c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1773&q=80',
    },
    {
      firstName: 'Ishmeet',
      id: 8,
      image:
        'https://plus.unsplash.com/premium_photo-1661714264890-002b648f816c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80',
    },
    {
      firstName: 'Bhavneet',
      id: 9,
      image:
        'https://images.unsplash.com/photo-1583947581924-860bda6a26df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1767&q=80',
    },
    {
      firstName: 'Tanishq',
      id: 10,
      image:
        'https://images.unsplash.com/photo-1520032525096-7bd04a94b5a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1776&q=80',
    },
    {
      firstName: 'Sarfraz',
      id: 11,
      image:
        'https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
    },
  ];
  const posts = [
    {
      firstName: 'Jaspal',
      lastName: 'Singh',
      location: 'Delhi',
      likes: 1200,
      comments: 123,
      bookmarks: 4,
      id: 1,
      storyImage:
        'https://images.unsplash.com/photo-1507697364665-69eec30ea71e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2371&q=80',
      image:
        'https://images.unsplash.com/photo-1462965326201-d02e4f455804?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    },
    {
      firstName: 'Abhishek',
      lastName: 'Ojha',
      location: 'Delhi',
      likes: 423,
      comments: 23,
      bookmarks: 2,
      id: 2,
      storyImage:
        'https://images.unsplash.com/photo-1494199505258-5f95387f933c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1773&q=80',
      image:
        'https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    },
    {
      firstName: 'Angad',
      lastName: 'Singh',
      location: 'Punjab',
      likes: 1300,
      comments: 423,
      bookmarks: 5,
      id: 3,
      storyImage:
        'https://plus.unsplash.com/premium_photo-1661714264890-002b648f816c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80',
      image:
        'https://media.istockphoto.com/id/498405596/photo/please-support-our-food-drive-holiday-canned-food-drive.jpg?s=1024x1024&w=is&k=20&c=i2gDVlGn_hiZ8R1ABwAtT_qpnyPALcyQy_7EE1shQb4=',
    },
    {
      firstName: 'Gagandeep',
      lastName: 'Singh',
      location: 'Gurgaon',
      likes: 1,
      comments: 0,
      bookmarks: 0,
      id: 4,
      storyImage:
        'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      image:
        'https://images.unsplash.com/photo-1603398938378-e54eab446dde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    },
    {
      firstName: 'Bhavneet',
      lastName: 'Singh',
      location: 'Banglore',
      likes: 1290,
      comments: 1234,
      bookmarks: 64,
      id: 5,
      storyImage:
        'https://images.unsplash.com/photo-1583947581924-860bda6a26df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1767&q=80',
      image:
        'https://images.unsplash.com/photo-1617576683096-00fc8eecb3af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    },
    {
      firstName: 'Deepanshu',
      lastName: 'Solanki',
      location: 'Shimla',
      likes: 499,
      comments: 23,
      bookmarks: 0,
      id: 6,
      storyImage:
        'https://images.unsplash.com/photo-1542810634-71277d95dcbb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      image:
        'https://images.unsplash.com/photo-1530538987395-032d1800fdd4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    },
  ];
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
    // <NavigationContainer>
    <SafeAreaView style={globalStyle.backgroundWhite}>
      <FlatList
        ListHeaderComponent={
          <>
            <View style={style.header}>
              <Pressable
                onPress={() => {
                  console.log('function callled');
                  navigation.navigate(Routes.VideoCall);
                }}>
                <Title title={"Let's Explore"} />
              </Pressable>
              <Pressable
                style={style.messageIcon}
                // onPress={() => {
                //   navigation.navigate(Routes.Profile);
                // }}
              >
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
                  <UserStory firstName={item.firstName} image={item.image} />
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
              image={item.image}
              storyImage={item.storyImage}
            />
          </View>
        )}
      />
    </SafeAreaView>
    // </NavigationContainer>
  );
}
