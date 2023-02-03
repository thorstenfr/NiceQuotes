import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import * as React from 'react';
import { Pressable, View, StyleSheet, Text } from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BigButton from './components/BigButton';
import Quote from './components/Quote';
import NewQuote from './components/NewQuote';
import IconButton from './components/IconButton';



const data = [
  { text: 'Wege entstehen dadurch, dass man sie geht.', author: 'Franz Kafka' },
  {
    text: 'Phantasie ist wichtiger als Wissen, denn Wissen ist begrenzt.',
    author: 'Albert Einstein',
  },
  {
    text: 'Nichts auf der Welt ist so mächtig wie eine Idee, deren Zeit gekommen ist.',
    author: 'Victor Hugo',
  },
  {
    text: 'Unsere größte Schwäche liegt im Aufgeben. Der sichere Weg zum Erfolg ist immer, es doch noch einmal zu versuchen.',
    author: 'Thomas Alva Edison',
  },
];

export default function App() {
  const [index, setIndex] = useState(0);
  const [quotes, setQuotes] = useState(data);
  const [showNewDialog, setShowNewDialog] = useState(false);

  const quote = quotes[index];

  function addQuoteToList(text, author) {
    setShowNewDialog(false);
    const newQuotes = [...quotes, { text, author }];
    setQuotes(newQuotes);
    setIndex(newQuotes.length - 1);
    saveQuotes(newQuotes);

  }

  function saveQuotes(newQuotes) {
    AsyncStorage.setItem('QUOTES',JSON.stringify(newQuotes));
    }

    async function loadQuotes() {
      let quotesFromDB = await AsyncStorage.getItem('QUOTES');
      if (quotesFromDB !== null) {
        quotesFromDB = JSON.parse(quotesFromDB);
        console.log("Anzahl der Ziatte: " + quotesFromDB.length);
        

      }
    }
    loadQuotes();

   
  return (
    <View style={styles.container}>
    <IconButton onPress={() => setShowNewDialog(true)} icon="add-circle" style={styles.new}/>
    
      <NewQuote
        visible={showNewDialog}
        onCancel={() => setShowNewDialog(false)}
        onSave={addQuoteToList}
      />
      <Quote text={quote.text} author={quote.author} />
      <BigButton
        title="Nächstes Zitat"
        onPress={() => setIndex((index + 1) % quotes.length)}
        style={styles.next}
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
  next: {
     position: 'absolute',
    bottom: 60
  },
  new: {
    position: 'absolute',
    top: 60,
    right: 30,
  },
});
