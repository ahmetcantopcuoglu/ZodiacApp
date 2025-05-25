import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
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
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
});
