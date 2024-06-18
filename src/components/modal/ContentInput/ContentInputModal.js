import React, { useState } from 'react';
import { View, TextInput,TouchableOpacity,Text, Button} from 'react-native';
import Modal from 'react-native-modal';
import styles from './ContentInputModal.style';

const ContentInputModal = ({ visible, onClose, onSend }) => {
  const [text, setText] = useState();

  function handleSend(){
    if(!text){
        return;
    }
    onSend(text);
    setText(null);
  }

  return (
    <Modal 
        style={styles.modal} 
        isVisible={visible}
        swipeDirection="down"
        onSwipeComplete={onClose} 
        onBackdropPress={onClose} 
        onBackButtonPress={onClose}
    >
      <View style={styles.container}>
        <View style={styles.inputContainer}>
            <TextInput placeholder='Send a message to the Dwellers!' value={text} onChangeText={setText} multiline />
        </View>

        <TouchableOpacity  onPress={handleSend} style={styles.ButtonDesign}>
            <Text style={styles.buttonTitle}>Send a Message</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ContentInputModal;
