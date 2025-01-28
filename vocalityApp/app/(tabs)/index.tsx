import { Image, StyleSheet, Platform } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/vocality-icon.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Bienvenue au demo de Vocality 👋</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Étape 1: Pense à une phrase</ThemedText>
        <ThemedText>
          Ça pourrait être commander un café avec un croissant ☕, dire bonjour à un ami 🤝 ou demander un billet de train 🚂.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Étape 2: Commence à écrire la phrase</ThemedText>
        <ThemedText>
          Écris la phrase avec le clavier comme d'habitude
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Étape 3: Utilise les predictions Intelligentes!</ThemedText>
        <ThemedText>
          Pendant que tu écris ta phrase, certains mots te seront recommendés. En les cliquant, tu vas voir comment ta vitesse d'écriture augmente.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Étape 4: Clique sur le bouton de paler</ThemedText>
        <ThemedText>
          Ta phrase sera dit par ton téléphone 🔉
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
