import { Image } from 'expo-image';
import { Platform, StyleSheet, View } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Collapsible } from '@/components/Collapsible';

import { ExternalLink } from '@/components/ExternalLink';
import GCDAnimation from '@/components/math/GCDAnimation';

export default function GCDScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: 'lightcoral', dark: 'orange' }}
      headerImage={
        <Image
          source={require('@/assets/images/euclides.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Euclidean algorithm</ThemedText>
      </ThemedView>
      <Collapsible title="¿Qué es el máximo común divisor (GCD)?">
        <ThemedText>
          Dados dos enteros <ThemedText style={styles.code}>a</ThemedText> y <ThemedText style={styles.code}>b</ThemedText> es el entero más grande que divide a ambos sin dejar residuo.

          Por ejemplo, 3 es el máximo común divisor de 24 y 9.
        </ThemedText>
      </Collapsible>
      
      <Collapsible title="Versión Original">
        <ThemedText>
          Se puede demostrar que <ThemedText type="defaultSemiBold" style={styles.code}>gcd(a, b)= gcd(b, a-b)</ThemedText>.
          Entonces, si sustituimos repetidamente el número más grande entre <ThemedText style={styles.code}>a</ThemedText> o <ThemedText style={styles.code}>b</ThemedText> por <ThemedText style={styles.code}>a-b</ThemedText> hasta que uno sea 0. 
          El valor distinto de 0 es el GCD.
        </ThemedText>
        <View style={styles.centered}>
          <ThemedText type="title">gcd(24, 9)</ThemedText>
          <View style={styles.codeBlock}>
            <ThemedText style={styles.code}>{`
            24-9=15
            15-9=6
            9-6=3
            6-3=3
            3-3=0 
            `}</ThemedText>
          </View>
        </View>
        <ThemedText>
          Pero, restar repetidamente es lento...
        </ThemedText>
      </Collapsible>

      <ThemedView>
        <ThemedText>
          Nos aprovechamos de la propiedad <ThemedText type="defaultSemiBold" style={styles.code}>gcd(a, b)= gcd(b, a % b)</ThemedText> y dado que el <ThemedText type="defaultSemiBold" style={styles.code}>gcd(c, 0)= c</ThemedText> podemos definir recursivamente la función <ThemedText type="defaultSemiBold" style={styles.code}>gcd(a, b)</ThemedText> de la siguiente manera:
        </ThemedText>
      </ThemedView>

        <View style={styles.centered}>
          <ThemedText type="title">GCD</ThemedText>
          <View style={styles.codeBlock}>
            <ThemedText style={styles.code}>{`
int gcd (int a, int b) {
	if (b == 0)
		return a;
	return gcd(b, a % b);
}
            `}</ThemedText>
          </View>
        </View>
        <View style={styles.centered}>
          <ThemedText type="title">O (log min(a, b))</ThemedText>
          <View style={styles.codeBlock}>
            <ThemedText style={styles.code}>{`
int gcd (int a, int b) {
	while (b) {
		a %= b;
		swap(a, b);
	}
	return a;
}
            `}</ThemedText>
          </View>
        </View>

        <GCDAnimation />

        <ThemedView >
          <ThemedText>
            El <ThemedText type="defaultSemiBold" >mínimo común múltiplo (LCM)</ThemedText> de dos números se relaciona directamente con su <ThemedText type="defaultSemiBold" style={styles.code}>GCD</ThemedText> mediante la siguiente fórmula:
          </ThemedText>
        </ThemedView>

        <View style={styles.centered}>
          <ThemedText type="title">LCM</ThemedText>
          <View style={styles.codeBlock}>
            <ThemedText style={styles.code}>{`
int lcm(int a, int b) {
	return a / gcd(a, b) * b;
}
            `}</ThemedText>
          </View>
        </View>

              <ExternalLink href="https://cp-algorithms.com/algebra/euclid-algorithm.html">
                  <ThemedText type="link">Learn more on cp-algorithms.com →</ThemedText>
              </ExternalLink>

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
		height: '100%',
		width: 200,
		bottom: -50,
		left: 35,
		position: 'absolute',
		objectFit: 'contain',
	},
	description: {
		gap: 8,
		marginBottom: 8,
	},
	italic: {
		fontStyle: 'italic',
	},
	centered: {
		alignItems: 'center',
		justifyContent: 'center',
    	paddingVertical: 16,
	},
	codeBlock: {
		paddingVertical: 15,
    	paddingHorizontal: 30,
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
	code: {
		fontFamily: Platform.select({ ios: 'Courier', android: 'monospace', default: 'monospace' }),
		fontSize: 14,
	},
});
