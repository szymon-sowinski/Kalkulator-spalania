import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { db } from './firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { useState } from 'react';


export default function App() {
  const [distance, setDistance] = useState('');
  const [fuelUsed, setFuelUsed] = useState('');


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Dystans w km"
        keyboardType="numeric"
        value={distance}
        onChangeText={setDistance}
      />
      <TextInput
        style={styles.input}
        placeholder="Zużyte paliwo w litrach"
        keyboardType="numeric"
        value={fuelUsed}
        onChangeText={setFuelUsed}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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

});
