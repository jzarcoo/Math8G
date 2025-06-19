import { Image } from 'expo-image';
import { Platform, StyleSheet, View } from 'react-native';

// import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Criba from '@/components/math/SieveAnimation';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
// import { useColorScheme } from '@/hooks/useColorScheme';


export default function SieveScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/eratosthenes.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Sieve of Eratosthenes</ThemedText>
      </ThemedView>
      <ThemedView style={styles.description}>
        <ThemedText>
          Decimos que un <ThemedText style={styles.bold}>número es primo</ThemedText> si solo es divisible por 1 y por sí mismo.{' '}
          <ThemedText style={styles.italic}>2, 3 y 5</ThemedText> son ejemplos de números primos.
          En otro caso, se llama <ThemedText style={styles.bold}>compuesto</ThemedText>.
        </ThemedText>
        <ThemedText>
          Para saber si un número <ThemedText style={styles.code}>n</ThemedText> es primo, podríamos recorrer un ciclo desde{' '}
          <ThemedText style={styles.code}>2</ThemedText> hasta <ThemedText style={styles.code}>n-1</ThemedText> y verificar si
          alguno lo divide. Si algún número lo divide, entonces <ThemedText style={styles.bold}>no</ThemedText> es primo.
        </ThemedText>
      </ThemedView>
      <View style={styles.centered}>
        <ThemedText type="title">¿Es primo? O(n)</ThemedText>
        <View style={styles.codeBlock}>
          <ThemedText style={styles.code}>{`
bool esPrimo(int n) {
	for (int i = 2; i < n; i++) {
		if (n % i == 0) {
			return false;
		}
	}
	return true;
}
          `}</ThemedText>
        </View>
      </View>
      <ThemedView>
        <ThemedText>
          <IconSymbol size={32} name="exclamationmark" color={Colors.light.tint} style={styles.bold} />
          Si tomamos un número <ThemedText style={styles.code}>n</ThemedText> y buscamos sus divisores, estos aparecen en pares.
          Por ejemplo, si <ThemedText style={styles.code}>4</ThemedText> es divisor de <ThemedText style={styles.code}>28</ThemedText>, entonces también lo es{' '}
          <ThemedText style={styles.code}>28 / 4 = 7</ThemedText>. Así, obtenemos el par <ThemedText style={styles.code}>(4, 7)</ThemedText>.
        </ThemedText>
        

  <ThemedText>
    Esto significa que para todo divisor <ThemedText style={styles.code}>d</ThemedText> de <ThemedText style={styles.code}>n</ThemedText>, existe un divisor
    correspondiente <ThemedText style={styles.code}>n/d</ThemedText>. Si <ThemedText style={styles.code}>d</ThemedText> es menor o igual que{' '}
    <ThemedText style={styles.code}>√n</ThemedText>, entonces <ThemedText style={styles.code}>n/d</ThemedText> será mayor o igual que{' '}
    <ThemedText style={styles.code}>√n</ThemedText>.
  </ThemedText>

  <ThemedText>
    Por lo tanto, <ThemedText style={styles.bold}>solo es necesario verificar divisores hasta la raíz cuadrada de n</ThemedText>. Si <ThemedText style={styles.code}>n</ThemedText> tiene un divisor mayor a su raíz cuadrada, su divisor correspondiente será menor y ya lo habríamos revisado.
  </ThemedText>
</ThemedView>
      <View style={styles.centered}>
        <ThemedText type="title">¿Es primo? O(√n)</ThemedText>
        <View style={styles.codeBlock}>
          <ThemedText style={styles.code}>{`
bool esPrimo(int n) {
	for (int i = 2; i*i < n; i++) {
		if (n % i == 0) {
			return false;
		}
	}
	return true;
}
          `}</ThemedText>
        </View>
      </View>
      <Criba limit={100} />
      <View style={styles.centered}>
        <ThemedText type="title"></ThemedText>
        <View style={styles.codeBlock}>
          <ThemedText style={styles.code}>{`
vector<bool> criba(int n) {
	vector<bool> prime(n+1, true);
	prime[0] = prime[1] = false;
	for (int i = 2; i <= n; i++) {
		if (prime[i]) {
			for(int j = 2*i; j <= n; j += i) {
				prime[j] = false;
			}
		}
	}
	return prime;
}
          `}</ThemedText>
        </View>
      </View>
      <View style={styles.centered}>
        <ThemedText type="title">O(n log log n)</ThemedText>
        <View style={styles.codeBlock}>
          <ThemedText style={styles.code}>{`
vector<bool> criba(int n) {
	vector<bool> prime(n+1, true);
	prime[0] = prime[1] = false;
	for (int i = 2; i*i <= n; i++) {
		if (prime[i]) {
			for(int j = i*i; j <= n; j += i) {
				prime[j] = false;
			}
		}
	}
	return prime;
}
          `}</ThemedText>
        </View>
      </View>
      <ExternalLink href="https://cp-algorithms.com/algebra/sieve-of-eratosthenes.html">
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
		left: 0,
		position: 'absolute',
		objectFit: 'contain',
	},
	description: {
		gap: 8,
		marginBottom: 8,
	},
	bold: {
		fontWeight: 'bold',
	},
	italic: {
		fontStyle: 'italic',
	},
	centered: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 15,
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
