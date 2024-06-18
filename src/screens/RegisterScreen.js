import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import { Formik } from 'formik';
import auth from '@react-native-firebase/auth';
import { showMessage } from "react-native-flash-message";
import * as yup from 'yup';

import authErrorMessageParser from '../utils/authErrorMessageParser';

const initialFormValues = {
  usermail: '',
  password: '',
  repassword: '',
};

const RegisterScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  function handleLogin() {
    navigation.goBack();
  }

  const validationSchema = yup.object().shape({
    usermail: yup.string().email('Geçerli bir e-posta girin').required('E-posta gereklidir'),
    password: yup.string().min(6, 'Şifre en az 6 karakterden oluşmalıdır').required('Şifre gereklidir'),
    repassword: yup.string().oneOf([yup.ref('password'), null], 'Parolalar eşleşmelidir.')
  });

  async function handleFormSubmit(formValues, { resetForm }) {
    if (formValues.password !== formValues.repassword) {
      showMessage({
        message: "Şifreler Uyuşmuyor!",
        type: "danger",
      });
      setLoading(false);
      return;
    }

    try {
      await auth().createUserWithEmailAndPassword(
        formValues.usermail,
        formValues.password,
      );
      showMessage({
        message: "Kullanıcı Oluşturuldu.",
        type: "success",
      });
      resetForm();
      navigation.navigate("Login");
    } catch (error) {
      showMessage({
        message: authErrorMessageParser(error.message),
        type: "danger",
      });
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.appName}>Social Dwellers</Text>
      </View>
      <Formik initialValues={initialFormValues} onSubmit={handleFormSubmit} validationSchema={validationSchema}>
        {({ values, handleChange, handleSubmit, errors }) => (
          <>
            <TextInput autoCapitalize='none' style={styles.input} placeholder="E-postanızı giriniz.." value={values.usermail} onChangeText={handleChange('usermail')} />
            {errors.usermail && <Text style={styles.error}>{errors.usermail}</Text>}
            <TextInput autoCapitalize='none' style={styles.input} placeholder="Şifrenizi giriniz.." value={values.password} secureTextEntry onChangeText={handleChange('password')} />
            {errors.password && <Text style={styles.error}>{errors.password}</Text>}
            <TextInput autoCapitalize='none' style={styles.input} placeholder="Şifrenizi tekrar giriniz.." value={values.repassword} secureTextEntry onChangeText={handleChange('repassword')} />
            {errors.repassword && <Text style={styles.error}>{errors.repassword}</Text>}
            <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
              <Text style={styles.buttonText}>KAYIT OL</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>

      <TouchableOpacity onPress={handleLogin}>
        <Text style={styles.linkText}>Hesabın var mı? Giriş yap</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007BFF',
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
  error: {
    fontStyle: 'italic',
    color: 'red',
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
});

export default RegisterScreen;
