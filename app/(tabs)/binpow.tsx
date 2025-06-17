import { StyleSheet } from 'react-native';

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
});
