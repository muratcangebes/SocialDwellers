import { StyleSheet } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../HomeScreen/HomeScreen';
import ProfileScreen from '../ProfileScreen/ProfileScreen';
import FavoriteScreen from '../FavoriteScreen/FavoriteScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const FirstScreen = () => {
  return (
    <HomeScreen />
  );
};

export default FirstScreen;

const styles = StyleSheet.create({});
/*
  <Tab.Screen name="Favorite" component={FavoriteScreen} options={{ headerShown: false }} />
*/
