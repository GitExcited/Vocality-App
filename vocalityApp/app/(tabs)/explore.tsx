import { StyleSheet, Image, Platform } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { View, Keyboard,TouchableWithoutFeedback,TextInput, Text, TouchableOpacity, ScrollView,Alert  } from 'react-native';


import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import axios from 'axios';


export default function TabTwoScreen() {
  const [text, setText] = useState('');
  const [predictions, setPredictions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const lastText = useRef('');
  const API_URL = 'http://192.168.0.60:8000'; 


   // Mock predictor function - replace with your actual prediction logic
   const getPredictions = async (text: string,numWords: number) => {
    try {
      const response = await axios.post(`${API_URL}/predict`, { text , num_words: numWords});
      return response.data.predictions;
    } catch (error) {
      console.error('Error fetching predictions:', error);
      Alert.alert('Error', 'Failed to get predictions');
      return [];
    }
  };
  const testServerConnection = async () => {
    try {
      const response = await axios.get(`${API_URL}/test-connection`);
      console.log('Server connection test:', response.data);
    } catch (error) {
      console.error('Error testing server connection:', error);
      Alert.alert('Error', 'Failed to connect to the server');
    }
  };

  const handleTextChange = async (newText: string) => {
    setText(newText);
    testServerConnection();
    // Check if the text ends with a space and is different from last processed text
    if (newText.endsWith(' ') && newText !== lastText.current) {
      lastText.current = newText;
      setIsLoading(true);

      try {
        const newPredictions = await getPredictions(newText.trim(),10);
        setPredictions(newPredictions);
      } catch (error) {
        console.error('Error getting predictions:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleWordSelect = async (word: string) => {
    const newText = text + word + ' ';
    setText(newText);
    await handleTextChange(newText);
  };
  const handleTextToSpeech = () => {
    Alert.alert('🔊', text);

  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

<View style={styles.container}>
<View style={styles.topSpacer} />

      <TextInput
        ref={inputRef}
        style={styles.input}
        value={text}
        onChangeText={handleTextChange}
        placeholder="Commence à écrire..."
        multiline={false}
        autoCorrect={false} // Disable auto-correction
        autoComplete="off" // Disable auto-completion
        autoFocus
      />

      <ScrollView style={styles.predictionsContainer} keyboardShouldPersistTaps="handled">
        {isLoading ? (
          <Text style={styles.loadingText}>Generating predictions...</Text>
        ) : (
          <View style={styles.buttonGrid}>
            {predictions.map((word, index) => (
              <TouchableOpacity
                key={index}
                style={styles.predictionButton}
                onPress={() => handleWordSelect(word)}
              >
                <Text style={styles.buttonText}>{word}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
      <TouchableOpacity style={styles.speechButton} onPress={handleTextToSpeech}>
          <Text style={styles.speechButtonText}>Speak</Text>
        </TouchableOpacity>
    </View>
    </TouchableWithoutFeedback>

  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  topSpacer: {
    height: 100, // Adjust this value to control how far down the content starts
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  input: {
    height: 50,
    borderWidth: 2,
    borderColor: '#35d0b6',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#f0f0f0',
  },
  predictionsContainer: {
    flex: 1,
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  predictionButton: {
    backgroundColor: '#f66c58',
    borderRadius: 25,
    padding: 15,
    width: '31%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#333333',
    fontSize: 14,
    fontWeight: 'bold',
  },
  loadingText: {
    textAlign: 'center',
    color: '#333333',
    fontSize: 14,
    marginTop: 20,
  },
  speechButton: {
    padding: 16,
    backgroundColor: '#35d0b6',
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 16,
  },
  speechButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
