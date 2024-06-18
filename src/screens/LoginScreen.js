import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, SafeAreaView,Platform } from 'react-native';
import { Formik,Yup } from 'formik';
import auth from '@react-native-firebase/auth';
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage} from "react-native-flash-message";

import authErrorMessageParser from '../utils/authErrorMessageParser';

const initialFormValues = {
  usermail: '',
  password: '',
};

const LoginScreen = ({ navigation }) => {
  const [loading,setLoading] = useState(false);

  function handleSignUp() {
    navigation.navigate('Register');
  }

  
  const validationSchema = yup.object().shape({
    usermail: yup.string().email('Geçerli bir e-posta girin').required('E-posta gereklidir'),
    password: yup.string().min(6, 'Şifre en az 6 karakterden oluşmalıdır').required('Şifre gereklidir'),
  });

  async function handleFormSubmit(formValues) {
    try{
      setLoading(true);
      await auth().signInWithEmailAndPassword(
        formValues.usermail,
        formValues.password
      );
      navigation.navigate('First')
      formValues.usermail='';
      formValues.password='';
      setLoading(false);
    }catch(error){
      showMessage({
        message: authErrorMessageParser(error.message),
        type: "danger",
      });
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.header}>Social Dwellers</Text>

      <Formik initialValues={initialFormValues} onSubmit={handleFormSubmit} validationSchema={validationSchema}>
        {({ values, handleChange, handleSubmit,errors }) => (
          <>
            <TextInput
              autoCapitalize='none'
              style={styles.input}
              placeholder="E-postanızı giriniz..."
              value={values.usermail}
              onChangeText={handleChange('usermail')}
            />
            {errors.usermail && <Text style={styles.error}>{errors.usermail}</Text>}
            <TextInput
              autoCapitalize='none'
              style={styles.input}
              placeholder="Şifrenizi giriniz..."
              secureTextEntry
              value={values.password}
              onChangeText={handleChange('password')}
            />
            {errors.password && <Text style={styles.error}>{errors.password}</Text>}
            <TouchableOpacity style={styles.button} onPress={handleSubmit} loading={loading}>
              <Text style={styles.buttonText}>GİRİŞ YAP</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>

      <TouchableOpacity onPress={handleSignUp}>
        <Text style={styles.linkText}>Kayıt olmak mı? Kayıt ol</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  error:{
    fontStyle: 'italic',
    color:'red',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#C7C8CC',
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 5,
    padding: Platform.OS === 'android' ? 0 : 5,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  linkText: {
    marginTop: 20,
    color: '#007BFF',
  },
  header: {
    color: '#007BFF',
    margin: 5,
    fontSize: 40,
  }
});

export default LoginScreen;
