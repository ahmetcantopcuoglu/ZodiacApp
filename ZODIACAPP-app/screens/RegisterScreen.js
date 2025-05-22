import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert, Platform, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://192.168.1.4:3000/api/auth/register', {
        name,
        email,
        password,
        birthDate: birthDate.toISOString().split('T')[0] // YYYY-MM-DD formatında gönderiyoruz
      });

      Alert.alert('Başarılı', 'Kayıt başarılı! Giriş ekranına yönlendiriliyorsunuz.');
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
      Alert.alert('Hata', error.response?.data?.message || 'Kayıt başarısız.');
    }
  };

  const onChangeDate = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      setBirthDate(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kayıt Ol</Text>

      <TextInput
        style={styles.input}
        placeholder="Kullanıcı Adı"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="E-posta"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Şifre"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Pressable onPress={() => setShowPicker(true)} style={styles.dateInput}>
        <Text style={{ color: '#000' }}>
          Doğum Tarihi: {birthDate.toLocaleDateString('tr-TR')}
        </Text>
      </Pressable>

      {showPicker && (
        <DateTimePicker
          value={birthDate}
          mode="date"
          display="default"
          onChange={onChangeDate}
          maximumDate={new Date()} // bugünden büyük olmasın
        />
      )}

      <Button title="Kayıt Ol" onPress={handleRegister} />
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 12,
    marginBottom: 15,
    borderRadius: 5
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center'
  }
});
