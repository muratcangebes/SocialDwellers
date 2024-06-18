import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const FavoriteScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Favorite Screen</Text>
    </View>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
