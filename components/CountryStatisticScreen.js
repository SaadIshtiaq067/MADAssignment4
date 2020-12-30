import axios from 'axios';
import * as React from 'react';
import {ActivityIndicator,Button,View,Text,StyleSheet,FlatList,TouchableOpacity, AsyncStorage,} from 'react-native';
import { useState, useEffect } from 'react';

const Country = () => {
  const [loading, isLoading] = useState(true);
  const [dataWorld, setDataWorld] = useState([]);
  const [getCovid, setCovid] = useState([]);
  const [detail, setDetail] = useState(null);

  const Fav = async (country) => {
    try {
      await AsyncStorage.setItem(country, country);
      var key = await AsyncStorage.getAllKeys();
      console.log(key);
    } 
    catch (error) 
    
    {
      console.error(error);
    }
  };

  useEffect(() => {
    world();
    covid();
  }, []);

  const world = () => {
    const options = {
      method: 'GET',
      url: 'https://world-population.p.rapidapi.com/allcountriesname',
      headers: {
        'x-rapidapi-key': '3a067d899dmsh11248ece56f1d67p1b704ajsn11674320f220',
        'x-rapidapi-host': 'world-population.p.rapidapi.com',
      },
    };

    axios
      .request(options)
      .then(function (response) {
        isLoading(false);
        setDataWorld(response.data.body.countries);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const covid = () => {
    const options = {
      method: 'GET',
      url: 'https://covid-19-data.p.rapidapi.com/country',
      params: { name: 'pakistan' },
      headers: {
        'x-rapidapi-key': '3a067d899dmsh11248ece56f1d67p1b704ajsn11674320f220',
        'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setCovid(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };


  

  const detailScreen = (item) => {
    return (
      <View style={styles.container}>
        <Text style={styles.texthead}>
         {item} Covid-19 Statistics
         </Text>
        <Text style={styles.text}>
        Confirmed Cases: {JSON.stringify(getCovid[0].confirmed)}
        </Text>
        <Text style={styles.text}>
        Recovered Cases: {JSON.stringify(getCovid[0].recovered)}
        </Text>
        <Text style={styles.text}>
        Critical Cases: {JSON.stringify(getCovid[0].critical)}
        </Text>
        <Text style={styles.text}>
        Deaths: {JSON.stringify(getCovid[0].deaths)}
        </Text>
        <Text style={styles.bottomtext}>
        Last Updated: {JSON.stringify(getCovid[0].lastUpdate)}
        </Text>
        
        <Button
  onPress={Fav}
  title="Save in favorites"
  color="green"
/>

      </View>
    );
  };

  {
    if (loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="blue" />
          <Text>Loading Data from JSON Placeholder API ...</Text>
        </View>
      );
    }
    if (!loading) {
      return (
        <View style={ styles.container}>
        <Text
           style = {styles.header}>
           COVID-19 Statistics 
           </Text>
          <Text style = {styles.head}>
            COUNTRY LIST 
          </Text>
          <FlatList
            keyExtractor={(item, index) => index}
            data={dataWorld}
            renderItem={({ item }) => (
              <TouchableOpacity activeOpacity={0.7}
                onPress={() => setDetail(item)}>

              <View
                style={ styles.list}>
                <View style={styles.text}>
                  <Text>{JSON.stringify(item)}</Text>
                </View>
                </View>
              </TouchableOpacity>)} />
          <Text
           style = {styles.footer}>
           By Saad Ishtiaq
           </Text>
        </View>
      );}
    if (detail) {
      return detailScreen(detail);
      }}};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center',
    backgroundColor: '#088be7',
    marginTop: 16,
    alignItems: 'center' 
    },
  
  head: {
    marginTop:20,
    color: '#ffd964',
    fontWeight: 'bold',
    fontSize: 23,
    fontFamily: 'Helvetica',
    },

    list:{
    lineHeight: 30,
    marginTop: 5,
    fontWeight: 'bold',
    backgroundColor: '#ffd964',
    height: 30,
    width: 260,
    textAlign: 'center',
    fontFamily: 'Helvetica',
    justifyContent: 'center',
    borderRadius: 5,
},
text: {
  fontWeight: 'bold',
},
footer:{
    marginTop: 20,
    marginBottom:10,
    fontSize: 14,
    fontFamily: 'Helvetica',
    textAlign: 'center', 
    color: 'white',
    justifyContent: 'center',
    },

    header:{
    fontWeight: 'bold',
    marginTop: 20,
    fontSize: 20,
    fontFamily: 'Helvetica',
    textAlign: 'center', 
    color: 'white',
    justifyContent: 'center',
    },

    text: {
    lineHeight: 30,
    marginTop: 5,
    fontWeight: 'bold',
    backgroundColor: '#ffd964',
    height: 30,
    width: 250,
    textAlign: 'center',
    fontFamily: 'Helvetica',
    justifyContent: 'center',
    borderRadius: 5,
  },
  texthead: {
    marginTop:20,
    marginBottom:10,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'Helvetica',
    },
    bottomtext: {
    marginTop:10,
    marginBottom:10,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 10,
    fontFamily: 'Helvetica',
    },
    
  
});

export default Country;
