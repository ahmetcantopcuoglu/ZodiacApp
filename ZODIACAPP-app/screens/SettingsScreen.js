import React, { useState, useEffect } from 'react';
import { View, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    // Medya kütüphanesi için izin iste
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('İzin Gerekli', 'Fotoğraf galerisine erişim izni verilmelidir.');
      }
    })();

    // AsyncStorage'dan token'ı yükle
    const loadToken = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          setUserToken(token);
        } else {
          Alert.alert('Hata', 'Kullanıcı girişi yapılmamış.');
        }
      } catch (error) {
        Alert.alert('Hata', 'Token alınamadı.');
      }
    };

    loadToken();
  }, []);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.7,
      });

      if (!result.canceled) {
        const uri = result.assets[0].uri;
        setSelectedImage(uri);
        await uploadImage(uri);
      }
    } catch (error) {
      Alert.alert('Hata', 'Resim seçerken hata oluştu.');
      console.log(error);
    }
  };

  const uploadImage = async (uri) => {
    if (!userToken) {
      Alert.alert('Hata', 'Kullanıcı token bulunamadı.');
      return;
    }

    const formData = new FormData();
    formData.append('profileImage', {
      uri: uri,
      name: 'profile.jpg',
      type: 'image/jpeg',
    });

    try {
      const res = await axios.post('http://192.168.1.12:3000/api/user/upload-profile-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userToken}`,
        },
      });

      // Upload başarılıysa, resmi AsyncStorage'a kaydet
      await AsyncStorage.setItem('profileImage', uri);

      Alert.alert('Başarılı', 'Profil fotoğrafı yüklendi.');
      console.log('Başarılı:', res.data);
    } catch (err) {
      Alert.alert('Yükleme Hatası', 'Profil fotoğrafı yüklenemedi.');
      console.log('Yükleme hatası:', err);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Button title="Profil Fotoğrafı Yükle" onPress={pickImage} />
      {selectedImage && (
        <Image
          source={{ uri: selectedImage }}
          style={{ width: 120, height: 120, borderRadius: 60, marginTop: 20 }}
        />
      )}
    </View>
  );
};

export default SettingsScreen;
