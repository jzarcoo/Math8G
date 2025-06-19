import { Platform, StyleSheet, View } from 'react-native';

import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';
import BinPowAnimation from '@/components/math/BinPowAnimation';

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
          Para calcular <ThemedText style={styles.code}><ThemedText style={[{position : 'relative'}]}>3<ThemedText style={[{position : 'absolute', top: -6, fontSize : 10}]}>13</ThemedText></ThemedText></ThemedText>    harías <ThemedText style={styles.center}>3 x 3 x 3 x … x 3</ThemedText> 
          13 veces.  
        </ThemedText>
        <ThemedText>
          Sin embargo, con exponentes grandes es muy lento.
        </ThemedText>
      </ThemedView>
      <ThemedView>
        <ThemedText type="subtitle">¿Cómo mejorarlo?</ThemedText>
      </ThemedView>
      <ThemedView>
        <ThemedText>
          El truco para calcular <ThemedText style={styles.code}><ThemedText style={[{position : 'relative'}]}>a<ThemedText style={[{position : 'absolute', top: -6, fontSize : 10}]}>n</ThemedText></ThemedText></ThemedText>  es usar la representación binaria del exponente
        </ThemedText>
        <ThemedText>
          Con esta técnica podemos calcular <ThemedText style={styles.code}><ThemedText style={[{position : 'relative'}]}>a<ThemedText style={[{position : 'absolute', top: -6, fontSize : 10}]}>n</ThemedText></ThemedText></ThemedText>  en <ThemedText style={styles.code} type='defaultSemiBold'>O(log(n))</ThemedText>  
          pues la representación binaria de <ThemedText style={styles.code}>n</ThemedText> tiene <ThemedText style={styles.code} type='defaultSemiBold'>{'\u230A'}log₂ n{'\u230B'} + 1</ThemedText> bits.
        </ThemedText>
      </ThemedView>
      
      <ThemedView>
        <ThemedText>
          13 en binario es <ThemedText style={styles.code}>1101₂</ThemedText>.  
          Entonces, 
          <ThemedText style={styles.center}>
            3<ThemedText style={styles.exponent}>1101</ThemedText> = 3
            <ThemedText style={styles.exponent}>1000</ThemedText> x 3
            <ThemedText style={styles.exponent}>100</ThemedText> x 3
            <ThemedText style={styles.exponent}>1</ThemedText>
          </ThemedText>
          <ThemedText style={styles.center}>
              = 3
              <ThemedText style={styles.exponent}>8</ThemedText> x 3
              <ThemedText style={styles.exponent}>4</ThemedText> x 3
              <ThemedText style={styles.exponent}>1</ThemedText>
          </ThemedText>
          tiene menos multiplicaciones.
        </ThemedText>
      </ThemedView>
      <ThemedView>
        <ThemedText>
          De modo que solo necesitamos una forma rápida de calcular esos digitos.
          Por suerte un elemento en la secuencia es solo el cuadrado de el elemento previo
        </ThemedText>
      </ThemedView>
      <ThemedView>
        <ThemedText style={styles.center}>3<ThemedText style={styles.exponent}>1</ThemedText> = 3</ThemedText>
        <ThemedText style={styles.center}>3<ThemedText style={styles.exponent}>10</ThemedText> = 3<ThemedText style={styles.exponent}>2</ThemedText> = (3<ThemedText style={styles.exponent}>1</ThemedText>)<ThemedText style={styles.exponent}>2</ThemedText> = 3<ThemedText style={styles.exponent}>2</ThemedText> = 9</ThemedText>
        <ThemedText style={styles.center}>3<ThemedText style={styles.exponent}>100</ThemedText> = 3<ThemedText style={styles.exponent}>4</ThemedText> = (3<ThemedText style={styles.exponent}>2</ThemedText>)<ThemedText style={styles.exponent}>2</ThemedText> = 9<ThemedText style={styles.exponent}>2</ThemedText> = 81</ThemedText>
        <ThemedText style={styles.center}>3<ThemedText style={styles.exponent}>1000</ThemedText> = 3<ThemedText style={styles.exponent}>8</ThemedText> = (3<ThemedText style={styles.exponent}>4</ThemedText>)<ThemedText style={styles.exponent}>2</ThemedText> = 81<ThemedText style={styles.exponent}>2</ThemedText> = 6561</ThemedText>
        <ThemedText>
          Así que para llegar a la respuesta final solo necesitamos multiplicar 3 de ellos (nos saltamos <ThemedText style={[{position : 'relative'}]}>3<ThemedText style={[{position : 'absolute', top: -6, fontSize : 10}]}>2</ThemedText></ThemedText>  porque ese bit no se encuentra prendido)
        </ThemedText>
        <ThemedText style={styles.center}>3<ThemedText style={styles.exponent}>13</ThemedText> = 3<ThemedText style={styles.exponent}>8</ThemedText> x 3<ThemedText style={styles.exponent}>4</ThemedText> x 3<ThemedText style={styles.exponent}>1</ThemedText> = 6561 x 81 x 3 = 1 594 323</ThemedText>
      </ThemedView>
      <View style={styles.centered}>
        <View style={styles.codeBlock}>
          <ThemedText style={styles.code}>{`
          long long binpow(long long a, long long b) {
              long long res = 1;
              while (b > 0) {
                  if (b & 1)
                      res = res * a;
                  a = a * a;
                  b >>= 1;
              }
              return res;
          }
          `}</ThemedText>
        </View>
      </View>
      <BinPowAnimation />
      <View style={styles.centered}>
        <ThemedText type="title">Módulo m</ThemedText>
        <View style={styles.codeBlock}>
          <ThemedText style={styles.code}>{`
          long long binpow(long long a, long long b, long long m) {
              a %= m;
              long long res = 1;
              while (b > 0) {
                  if (b & 1)
                      res = res * a % m;
                  a = a * a % m;
                  b >>= 1;
              }
              return res;
          }
          `}</ThemedText>
        </View>
      </View>
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
  }, 
   centered: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  codeBlock: {
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    width: '90%',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
  },
  exponent: {
    fontSize: 10,
    transform: [{ translateY: -6 }],
    // position: 'absolute',
  },
});
