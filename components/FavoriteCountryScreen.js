import axios from 'axios';
import * as React from 'react';
import { ActivityIndicator,Button,View, Text, StyleSheet, FlatList, TouchableOpacity, AsyncStorage,} from 'react-native';
import { useState, useEffect } from 'react';

const Fav = () => {
  const [data, setData] = useState([]);

  return (
    <View style={styles.container}>
          <Text style = {styles.head}>
            Favorites
          </Text>
          <FlatList

          />
        </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center',
    backgroundColor: '#088be7',
    marginTop: 20,
    alignItems: 'center' 
    },
     head: {
    marginTop:20,
    color: '#ffd964',
    fontWeight: 'bold',
    fontSize: 30,
    fontFamily: 'Helvetica',
    },
    });

     

export default Fav;
