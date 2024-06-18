import React from 'react';
import {TouchableOpacity,StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const CardScreen = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon name="plus" color='white' size={30} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position:'absolute',
    bottom:20,
    right:20,
    borderRadius: 50,
    width: 60,
    height:60,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#0464c9'
  },
});

export default CardScreen;
