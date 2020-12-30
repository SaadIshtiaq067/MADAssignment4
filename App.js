import axios from 'axios';
import * as React from 'react';
import {
  ActivityIndicator,
  Button,
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  FlatList,
} from 'react-native';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import World from './components/WorldStatisticScreen';
import Country from './components/CountryStatisticScreen';
import Fav from './components/FavoriteCountryScreen';
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();


function MyDrawer() {
  return (
    <Drawer.Navigator>
    <Drawer.Screen name="CountryStatisticScreen" component={Country}/>
    <Drawer.Screen name="WorldStatisticScreen" component={World}/>
     <Drawer.Screen name="FavoriteCountryScreen" component={Fav}/>
     
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}