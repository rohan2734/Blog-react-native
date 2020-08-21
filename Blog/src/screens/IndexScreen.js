import React,{useContext} from 'react';
import {View,Text,StyleSheet,FlatList,Button,TouchableOpacity} from 'react-native';
import {Context} from '../context/BlogContext';

import { AntDesign } from '@expo/vector-icons';

const IndexScreen = ({navigation}) => {
  const {state,addBlogPost,deleteBlogPost} = useContext(Context);

  return (
    <View>
      <Button title="Add Post" onPress={addBlogPost} />
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
