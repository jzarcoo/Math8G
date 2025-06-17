import { Platform, StyleSheet } from 'react-native';

import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabTwoScreen() {
  const theme = useColorScheme() ?? 'light';
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: 'purple', dark: 'magenta' }}
      headerImage={
        <IconSymbol
          size={310}
          name="bolt.fill"
          color='#fff'
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Binary Exponentiation</ThemedText>
      </ThemedView>
      {/* 1. Problema */}
      <ThemedView>
        <ThemedText>
          Para calcular <ThemedText style={styles.code}>3^13</ThemedText> harías <ThemedText style={styles.center}>3×3×3×…×3</ThemedText> 
          13 veces.  
        </ThemedText>
        <ThemedText>
          Sin embargo, con exponentes grandes es muy lento.
        </ThemedText>
        <ThemedText>
          13 en binario es <ThemedText style={styles.code}>1101₂</ThemedText>.  
          Entonces, <ThemedText style={styles.center}>3^{13} = 3^8 × 3^4 × 3^1</ThemedText>
        </ThemedText>
      </ThemedView>
      <ExternalLink href="https://cp-algorithms.com/algebra/binary-exp.html">
          <ThemedText type="link">Learn more on cp-algorithms.com →</ThemedText>
      </ExternalLink>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  code: {
    fontFamily: Platform.select({ ios: 'Courier', android: 'monospace', default: 'monospace' }),
    fontSize: 16,
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    fontFamily: Platform.select({ ios: 'Courier', android: 'monospace', default: 'monospace' }),
    fontSize: 16,
  }
});
