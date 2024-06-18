import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity,Alert } from 'react-native';
import ContentInputModal from '../../components/modal/ContentInput/ContentInputModal';
import CardScreen from '../../components/Card/CardScreen';
import MessageCard from '../../components/MessageCard';

import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import parseContentData from '../../utils/parseContentData';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen = () => {
  const [inputModalVisible, setInputModalVisible] = useState(false);
  const [contentList, setContentList] = useState([]);

  useEffect(() => {
    const onValueChange = database().ref('/messages/').on('value', snapshot => {
      const contentData = snapshot.val();

      const parsedData = parseContentData(contentData || {});
      setContentList(parsedData);
    });

    return () => database().ref('/messages/').off('value', onValueChange);
  }, []);

  function handleInputToggle() {
    setInputModalVisible(!inputModalVisible);
  }

  function handleSendContent(content) {
    handleInputToggle();
    sendContent(content);
  }

  function sendContent(content) {
    const userMail = auth().currentUser.email;

    const contentObject = {
      text: content,
      username: userMail.split('@')[0],
      date: new Date().toISOString(),
      like: 0,
    };
    database().ref('/messages/').push(contentObject);
  }


  function handleLike(item){
    const userMail = auth().currentUser.email;
    const likedBy = item.likedBy || []; // Eğer likedBy alanı yoksa boş dizi olarak başlattım.

    // Eğer kullanıcı daha önce bu mesaja like atmamışsa yeni bir like ekleyin özelliği burada unutma!
    if (!likedBy.includes(userMail)) {
      likedBy.push(userMail);
      database().ref(`messages/${item.id}`).update({like: item.like+1, likedBy: likedBy});
    } else {
      Alert.alert('Uyarı', 'Bu mesaja daha önce like atılmış.');
    }
  }

  

  const renderContent = ({ item }) => <MessageCard message={item} onLike={() => handleLike(item)} />

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Dwellers</Text>
        <TouchableOpacity>
          <Icon style={styles.headerOutIcon} name='exit-to-app' onPress={()=> auth().signOut()} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={contentList}
        renderItem={renderContent}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContent}
      />
      <CardScreen onPress={handleInputToggle} />
      <ContentInputModal
        visible={inputModalVisible}
        onClose={handleInputToggle}
        onSend={handleSendContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  flatListContent: {
    paddingTop: 20,
    paddingBottom: 40,
  },
  headerOutIcon: {
    fontSize: 30,
    color: 'tomato',
  },
});

export default HomeScreen;
