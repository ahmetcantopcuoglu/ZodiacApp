import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const name = res.data.name;

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://192.168.1.7:3000/api/auth/login', { email, password });
      const token = res.data.token;

      await AsyncStorage.setItem('userToken', token);
     
      

      Alert.alert('Başarılı giriş yapıldı', '', [
        { text: 'Tamam', onPress: () => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });
        },
           },
    ]);

    } catch (err) {
      Alert.alert('Hata', 'Giriş Başarısız.');
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="E-posta"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Şifre"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Giriş Yap" onPress={handleLogin} />
      <Button title="Kayıt Ol" onPress={() => navigation.navigate('Register')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, marginTop: 100 },
  input: { borderWidth: 1, marginBottom: 12, padding: 8, borderRadius: 5 },
});

export default LoginScreen;
