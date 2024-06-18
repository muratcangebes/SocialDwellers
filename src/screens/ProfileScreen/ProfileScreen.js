import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';

const ProfileScreen = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const user = auth().currentUser;
    if (user) {
      setEmail(user.email);
      setPassword(password);
      setUsername(user.email.split('@')[0]); 
    }
  }, []);

  const handleEditProfile = () => {
    console.log('Profil düzenleme işlemi');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleEditProfile}>
        <Text style={styles.linkText}>Profil Düzenle</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Profil Bilgileri</Text>

        <View style={styles.profileInfo}>
          <Text style={styles.label}>Ad:</Text>
          <Text style={styles.info}>{username}</Text>
        </View>

        <View style={styles.profileInfo}>
          <Text style={styles.label}>E-posta:</Text>
          <Text style={styles.info}>{email}</Text>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={() => auth().signOut()}>
          <Text style={styles.logoutButtonText}>Çıkış Yap</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#E6F2FF',
  },
  linkText: {
    marginTop: 20,
    marginBottom: 10,
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center', 
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  profileInfo: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
    marginRight: 5,
    color: '#007BFF',
  },
  info: {
    flex: 1,
    color: '#333',
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: 'red', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#fff', 
    fontSize: 16,
  },
});
