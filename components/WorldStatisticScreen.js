import axios from 'axios';
import *as React from 'react';
import {ImageBackground, ActivityIndicator, Button,View,Text,ScrollView,Image,StyleSheet,FlatList,} from 'react-native';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';


const WorldStats = ({ navigation }) => {
  const [loading, isLoading] = useState([]);
  const [dataCovid, setDataCovid] = useState([]);
  const [dataWorld, setDataWorld] = useState([]);

  useEffect(() => {
    covid();
    WorldStats();
  }, []);

  const WorldStats = () => {
    const options = {
      method: 'GET',
      url: 'https://world-population.p.rapidapi.com/worldpopulation',
      headers: {
        'x-rapidapi-key': '3a067d899dmsh11248ece56f1d67p1b704ajsn11674320f220',
        'x-rapidapi-host': 'world-population.p.rapidapi.com',
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        isLoading(false);
        setDataWorld(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const covid = () => {
    const options = {
      method: 'GET',
      url: 'https://covid-19-data.p.rapidapi.com/totals',
      headers: {
        'x-rapidapi-key': '3a067d899dmsh11248ece56f1d67p1b704ajsn11674320f220',
        'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
      },
    };

    axios
      .request(options)
      .then(function (response) {
        isLoading(false);
        setDataCovid(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  
  const getObject = (getObj, pathArr) => {
  return pathArr.reduce(
  (obj, key) => (obj && obj[key] !== 'undefined' ? obj[key] : undefined), getObj);
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
  }
  {
    if (!loading) {
      return (
        <View style={styles.container}>
        <Text
           style = {styles.header}>
           COVID-19 Statistics 
           </Text>

          <Text
            style={styles.head}>
            World Statistic Screen
          </Text>

          <Text
            style={styles.heading}>
            Total confirmed cases: 
          </Text>
          <Text
          style={styles.text}>
          {getObject(dataCovid, ['0','confirmed'])}
          </Text>

          <Text
            style={styles.heading}>
            World population:
          </Text>
          <Text
          style={styles.text}>
            {getObject(dataWorld, ['body', 'world_population'])}
            </Text>

          <Text
            style={styles.heading}>
            Confirmed Cases Percentage:
            </Text>
            
            <Text
          style={styles.text}>
            {(getObject(dataCovid, ['0', 'confirmed']) / getObject(dataWorld, ['body', 'world_population'])) * 100}
          </Text>

          <Text
            style={styles.heading}>
            Critical Cases Percentage:
            </Text>
            <Text style={styles.text}>
            {(getObject(dataCovid, ['0', 'critical']) / getObject(dataCovid, ['0', 'confirmed'])) * 100}
          </Text>

          <Text
            style={styles.heading}>
            Recovered Cases Percentage: 
            </Text>
            <Text
          style={styles.text}>
            {(getObject(dataCovid, ['0', 'recovered']) / getObject(dataCovid, ['0', 'confirmed'])) * 100}
          </Text>


          <Text
            style={styles.heading}>
            Death Cases Percentage:
            </Text>

            <Text
          style={styles.text}>
            {(getObject(dataCovid, ['0', 'deaths']) / getObject(dataCovid, ['0', 'confirmed'])) * 100}
          </Text>
          

          <Text
           style = {styles.footer}>
           By Saad Ishtiaq
           </Text>

        </View>
      );
    }
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center',
    backgroundColor: '#088be7',
    marginTop: 20,
    alignItems: 'center' 
    },

    header:{
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 20,
    fontFamily: 'Helvetica',
    textAlign: 'center', 
    color: 'white',
    justifyContent: 'center',
    },

    head: {
    marginTop:20,
    color: '#ffd964',
    fontWeight: 'bold',
    fontSize: 30,
    fontFamily: 'Helvetica',
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

   footer:{
    marginTop: 20,
    fontSize: 14,
    fontFamily: 'Helvetica',
    textAlign: 'center', 
    color: 'white',
    justifyContent: 'center',
    },

  heading: {
    fontWeight: 'bold',
    color: 'white',
    marginTop: 5,
    fontFamily: 'Helvetica',
    fontSize: 15,
  }
});

export default WorldStats;
