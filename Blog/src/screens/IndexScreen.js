import React,{useContext, useEffect} from 'react';
import {View,Text,StyleSheet,FlatList,Button,TouchableOpacity} from 'react-native';
import {Context} from '../context/BlogContext';

import { AntDesign } from '@expo/vector-icons';

const IndexScreen = ({navigation}) => {
  const {state,deleteBlogPost,getBlogPosts} = useContext(Context);

  useEffect(() => {
    getBlogPosts();

    const listener = navigation.addListener('didFocus',() => {
      getBlogPosts();
    });

    return () => {
      listener.remove();
    };
  },[])

  return (
    <View>
      <FlatList 
        data={state}
        keyExtractor={blogPost => blogPost.title }
        renderItem={({item}) => {
          return (
            <TouchableOpacity onPress={() => navigation.navigate('Show',{id:item.id})}>
              <View style={styles.row}>
                <Text style={styles.title} >{item.title}-{item.id}</Text>
                <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                  <AntDesign name="delete" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  );
};

IndexScreen.navigationOptions = ({navigation}) => {
  return {
    headerRight: () =>(<TouchableOpacity onPress={() =>navigation.navigate('Create')}>
        <AntDesign name="pluscircleo" size={24} color="black" />
      </TouchableOpacity>
      )
  };
} 
const styles = StyleSheet.create({
  row:{
    flexDirection:'row',
    justifyContent:'space-between',
    paddingVertical:20,
    borderWidth: 1,
    borderColor:'gray',
    paddingHorizontal:10
  },
  title: {
    fontSize:18
  }
});

export default IndexScreen;
