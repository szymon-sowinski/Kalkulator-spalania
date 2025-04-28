import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { db } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { useState } from 'react';

export default function App() {
  const [distance, setDistance] = useState('');
  const [fuelUsed, setFuelUsed] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    const distanceNum = parseFloat(distance);
    const fuelUsedNum = parseFloat(fuelUsed);

    if (isNaN(distanceNum) || isNaN(fuelUsedNum) || distanceNum <= 0 || fuelUsedNum <= 0) {
      alert('Podaj prawidłowe wartości dla dystansu i zużycia paliwa.');
      return;
    }

    const fuelConsumptionPer100km = (fuelUsedNum / distanceNum) * 100;

    try {
      await addDoc(collection(db, 'spalanie'), {
        distance: distanceNum,
        fuelUsed: fuelUsedNum,
        fuelConsumptionPer100km: fuelConsumptionPer100km,
        createdAt: new Date()
      });

      setResult(fuelConsumptionPer100km.toFixed(2)); 
      setDistance('');
      setFuelUsed('');
    } catch (error) {
      console.error('Błąd zapisu do Firestore:', error);
      alert('Nie udało się zapisać danych.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Oblicz spalanie</Text>
      <TextInput
        style={styles.input}
        placeholder="Dystans (km)"
        keyboardType="numeric"
        value={distance}
        onChangeText={setDistance}
      />
      <TextInput
        style={styles.input}
        placeholder="Zużyte paliwo (litry)"
        keyboardType="numeric"
        value={fuelUsed}
        onChangeText={setFuelUsed}
      />
      <Button title="Oblicz i zapisz" onPress={handleSubmit} />
      
      {result !== null && (
        <Text style={styles.resultText}>
          Twoje spalanie: {result} l/100km
        </Text>
      )}
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  resultText: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
  },
});
