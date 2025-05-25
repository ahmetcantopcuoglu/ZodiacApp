import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';
import tarotCards from '../tarotCards';
import { useNavigation } from '@react-navigation/native';

const screenHeight = Dimensions.get('window').height;

const TarotCardSelectionScreen = () => {
  const [selectedCards, setSelectedCards] = useState([]);
  const navigation = useNavigation();

  const handleCardSelect = (card) => {
    if (selectedCards.includes(card)) {
      setSelectedCards(selectedCards.filter(c => c !== card));
    } else {
      if (selectedCards.length >= 3) {
        Alert.alert("Uyarı", "En fazla 3 kart seçebilirsiniz.");
        return;
      }
      setSelectedCards([...selectedCards, card]);
    }
  };

  const handleConfirm = () => {
    if (selectedCards.length !== 3) {
      Alert.alert("Uyarı", "Lütfen 3 kart seçin.");
      return;
    }
    navigation.navigate('TarotResult', { selectedCards });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>3 Tarot Kartı Seçin</Text>

      {/* FlatList’i sınırlamak için kapsayıcı View */}
      <View style={styles.listContainer}>
        <FlatList
          data={tarotCards}
          keyExtractor={(item) => item.id?.toString() ?? item.name}
          numColumns={2}
          contentContainerStyle={styles.flatListContent}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.card,
                selectedCards.includes(item) && styles.selectedCard
              ]}
              onPress={() => handleCardSelect(item)}
              activeOpacity={0.8}
            >
              <Text style={styles.cardText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleConfirm} activeOpacity={0.9}>
        <Text style={styles.buttonText}>Seçimi Onayla</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TarotCardSelectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    padding: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    color: 'green',
    textAlign: 'center',
    marginBottom:15,
    marginTop:35,
  },
  listContainer: {
    maxHeight: screenHeight * 0.6  ,  // Yüksekliği ekranın %60’ı ile sınırla
    marginBottom: 30,
    paddingTop: 25,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    flex: 1,
    margin: 10,
    paddingVertical: 25,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  selectedCard: {
    backgroundColor: '#d1e7dd',
    borderColor: '#0f5132',
    borderWidth: 2,
  },
  cardText: {
    fontSize: 18,
    color: '#212529',
    fontWeight: '600',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#0d6efd',
    paddingVertical: 16,
    borderRadius: 12,
    // shadow eklemesi button için kalabilir
    shadowColor: '#0d6efd',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
});
