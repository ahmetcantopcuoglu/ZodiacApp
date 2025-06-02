import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';




const emojiMap = {
  Koç: '♈️',
  Boğa: '♉️',
  İkizler: '♊️',
  Yengeç: '♋️',
  Aslan: '♌️',
  Başak: '♍️',
  Terazi: '♎️',
  Akrep: '♏️',
  Yay: '♐️',
  Oğlak: '♑️',
  Kova: '♒️',
  Balık: '♓️',
};

export default function ZodiacScreen({ navigation }) {
  const [signs, setSigns] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://192.168.1.12:3000/api/zodiac/signs') // Gerekirse IP'yi düzenle
      .then(res => setSigns(res.data))
      .catch(err => setError('Burçlar yüklenemedi.'));
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Horoscope', { sign: item })}
    >
      <Text style={styles.emoji}>{emojiMap[item] || '✨'}</Text>
      <Text style={styles.cardText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Burç Seçiniz</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <FlatList
        data={signs}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        numColumns={3}
        contentContainerStyle={styles.grid}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f4f7',
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
    color: '#2c3e50',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  grid: {
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 10,
    margin: 10,
    alignItems: 'center',
    width: 100,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  emoji: {
    fontSize: 32,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34495e',
  },
});
