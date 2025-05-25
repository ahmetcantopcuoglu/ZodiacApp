import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function HoroscopeScreen({ route }) {
  const { sign } = route.params;
  const [period, setPeriod] = useState('daily');
  const [horoscope, setHoroscope] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

 

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

  const periods = [
    { label: 'Günlük', value: 'daily' },
    { label: 'Haftalık', value: 'weekly' },
    { label: 'Aylık', value: 'monthly' },
    { label: 'Yıllık', value: 'yearly' },
  ];

    const periodLabels = {
    daily: 'Günlük',
    weekly: 'Haftalık',
    monthly: 'Aylık',
    yearly: 'Yıllık',
  };

  const colors = {
    Koç: '#ffadad',
    Boğa: '#ffd6a5',
    İkizler: '#fdffb6',
    Yengeç: '#caffbf',
    Aslan: '#9bf6ff',
    Başak: '#a0c4ff',
    Terazi: '#bdb2ff',
    Akrep: '#ffc6ff',
    Yay: '#fffffc',
    Oğlak: '#d0f4de',
    Kova: '#a9def9',
    Balık: '#e4c1f9',
  };

  const fetchHoroscope = async (sign, period) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`http://192.168.1.2:3000/api/zodiac/horoscope`, {
        params: { sign, period },
      });
      setHoroscope(res.data.horoscope);
    } catch (e) {
      setError('Yorum alınamadı.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHoroscope(sign, period);
  }, [sign, period]);

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors[sign] || '#f5f0fa' }]}>
      <Text style={styles.emoji}>{emojiMap[sign]}</Text>
      <Text style={styles.title}>{sign} {periodLabels[period]} yorum</Text>

      <View style={styles.periodSelector}>
        {periods.map((p, index) => (
          <TouchableOpacity
            key={p.value}
            style={[
              styles.periodButton,
              period === p.value && styles.activePeriodButton,
              index % 2 === 0 ? { marginRight: 10 } : { marginLeft: 10 },
            ]}
            onPress={() => setPeriod(p.value)}
          >
            <Text
              style={[
                styles.periodButtonText,
                period === p.value && styles.activePeriodButtonText,
              ]}
            >
              {p.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading && <ActivityIndicator size="large" color="#6c3483" />}
      {error && <Text style={styles.error}>{error}</Text>}
      {!loading && !error && <Text style={styles.horoscopeText}>{horoscope}</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    justifyContent: 'flex-start', 
    paddingTop: 100,  
  },
  emoji: {
    fontSize: 70,
    marginBottom: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#4b0082',
    marginBottom: 25,
    textAlign: 'center',
  },
  periodSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 25,
  },
  periodButton: {
    backgroundColor: '#dcd6f7',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 8,
    width: '40%',
    alignItems: 'center',
  },
  activePeriodButton: {
    backgroundColor: '#6c3483',
  },
  periodButtonText: {
    fontSize: 16,
    color: '#5d5d5d',
  },
  activePeriodButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  horoscopeText: {
    fontSize: 18,
    lineHeight: 28,
    color: '#2c3e50',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
    marginTop: 15,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    fontSize: 16,
  },
});
