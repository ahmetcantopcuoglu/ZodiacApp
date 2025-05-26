import React, { useLayoutEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const username = 'Ahmet Can';


  // Çıkış fonksiyonu component içinde
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      setModalVisible(false); // Modalı kapat
      // Navigation stack'ini resetleyip Login ekranına yönlendir
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.log('Çıkış yaparken hata:', error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Anasayfa',
      headerTitleAlign: 'center',
      headerLeft: () => null,
      headerRight: () => (
        <TouchableOpacity onPress={() => setModalVisible(true)} style={{ marginRight: 15 }}>
          <Ionicons name="person-circle-outline" size={28} color="#2c3e50" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Profil Menüsü */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.usernameText}>{username}</Text>
            <TouchableOpacity style={styles.modalButton}>
              <Text style={styles.modalButtonText}>⚙️ Ayarlar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={handleLogout}>
              <Text style={styles.modalButtonText}>🚪 Çıkış</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <View style={styles.centerContainer}>
        <Text style={styles.welcomeText}>✨ Anasayfaya Hoş Geldiniz ✨</Text>
      </View>

      <ScrollView contentContainerStyle={styles.buttonsContainer}>
        <CustomButton title="📚 Blog Sayfası" onPress={() => navigation.navigate('Blog')} color="#3498db" />
        <CustomButton title="🔮 Burç Yorumları" onPress={() => navigation.navigate('Zodiac')} color="#e67e22" />
        <CustomButton title="☕ Kahve Falı" onPress={() => navigation.navigate('')} color="#9b59b6" />
        <CustomButton title="🃏 Tarot Falı" onPress={() => navigation.navigate('TarotSelect')} color="#2ecc71" />
        <CustomButton title="💤 Rüya Yorumcusu" onPress={() => navigation.navigate('Dream')} color="#f39c12" />
      </ScrollView>
    </View>
  );
}

function CustomButton({ title, onPress, color }) {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdfbfb',
    padding: 20,
  },
  centerContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2c3e55',
    textAlign: 'center',
  },
  buttonsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40,
  },
  button: {
    width: '100%',
    paddingVertical: 18,
    borderRadius: 12,
    marginVertical: 10,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    padding: 20,
  },
  modalContainer: {
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    elevation: 5,
  },
  usernameText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#2c3e50',
  },
  modalButton: {
    paddingVertical: 10,
  },
  modalButtonText: {
    fontSize: 16,
    color: '#34495e',
  },
});
