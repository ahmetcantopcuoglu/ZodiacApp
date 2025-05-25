import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const TarotResultScreen = ({ route }) => {
  const { selectedCards } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Kart Yorumları</Text>
      {selectedCards.map((card, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.cardName}>{card.name}</Text>
          <View style={styles.separator} />
          <Text style={styles.cardMeaning}>{card.meaning}</Text>
          <Text style={styles.cardDescription}>{card.description}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default TarotResultScreen;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 50,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 30,
    color: '#6a1b9a',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  card: {
    backgroundColor: '#ede7f6', // Açık lila, yumuşak ve modern
    padding: 22,
    borderRadius: 18,
    marginBottom: 30,
    shadowColor: '#7b1fa2',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 12,
  },
  cardName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#4527a0',
  },
  separator: {
    height: 3,
    backgroundColor: '#512da8',
    width: 50,
    marginVertical: 14,
    borderRadius: 3,
    alignSelf: 'flex-start',
  },
  cardMeaning: {
    fontSize: 17,
    fontStyle: 'italic',
    color: '#5e35b1',
    marginBottom: 14,
  },
  cardDescription: {
    fontSize: 16,
    color: '#3e3e3e',
    lineHeight: 24,
    fontWeight: '500',
  },
});
