import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';

const WORDS = [
	{ text: 'combinatoria', weight: 10 },
	{ text: 'mcd', weight: 8 },
	{ text: 'mcm', weight: 7 },
	{ text: 'criba de eratosthenes', weight: 6 },
	{ text: 'exponenciación binaria', weight: 15 },
	{ text: 'teoría de gráficas', weight: 17 },
	{ text: 'teoría de números', weight: 16 },
	{ text: "coeficiente binomial", weight: 3 },
	{ text: 'manipulación de bits', weight: 6 },
	{ text: 'congruencias', weight: 5 },
	{ text: 'algoritmo de euclides', weight: 5 },
	{ text: 'teoría de juegos', weight: 8 },
	{ text: 'juegos nim', weight: 10 },
	{ text: "permutaciones", weight: 3 },
	{ text: 'geometría', weight: 9 },
	{ text: 'álgebra modular', weight: 8 },
	{ text: 'convex hull', weight: 7 },
	{ text: 'matrix exponentiation', weight: 6 },
	{ text: 'fast fourier transform', weight: 10 },
	{ text: 'probabilidad', weight: 7 },
	{ text: 'teorema chino del residuo', weight: 5 },
	{ text: 'pequeño teorema de fermat', weight: 4 },
	{ text: 'números de catalán', weight: 6 },
	{ text: 'números de fibonacci', weight: 3 },
	{ text: "euler's totient function", weight: 3 },
	{ text: "inverso modular", weight: 3 },
];

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window');
const CONTAINER_WIDTH = WINDOW_WIDTH - 40;
const CONTAINER_HEIGHT = Math.max(WINDOW_HEIGHT /2, WINDOW_WIDTH/2);

interface WordPosition {
	top: number;
	left: number;
	rotation: number;
	color: string;
}

export function WordCloud() {
	const theme = useColorScheme();
	const [positions, setPositions] = useState<WordPosition[]>([]);
	const themeColors = [
		'orange',
		'gold',
		'tomato',
		'turquoise',
		'lime',
		'green',
		'blue',
		'violet',
		'magenta',
		'red',
		'yellow',
		'pink',
		'cyan',
		'coral'
	];

	const getColorIndex = (text: string) => {
		// let hash = 0;
		// for (let i = 0; i < text.length; i++) {
		// 	hash = text.charCodeAt(i) + ((hash << 5) - hash);
		// }
		// return Math.abs(hash);
		// color aleatorio
		return Math.floor(Math.random() * themeColors.length);
	};

	useEffect(() => {
		const calculatePositions = () => {
			const placedWords: WordPosition[] = [];
			
			WORDS.forEach(word => {
				const fontSize = 12 + word.weight * 1.6;
				const width = word.text.length * fontSize * 0.6;
				const height = fontSize * 1.2;
				
				let placed = false;
				let attempts = 0;
				
				while (!placed && attempts < 100) {
					const left = Math.random() * (CONTAINER_WIDTH - width);
					const top = Math.random() * (CONTAINER_HEIGHT - height);
					const rotation = Math.random() * 90 - 45;
					
					const collision = placedWords.some(existing => {
						const horizontalOverlap = 
							Math.abs(left - existing.left) * 2 < (width + fontSize * 4);
						const verticalOverlap = 
							Math.abs(top - existing.top) * 2 < (height + fontSize * 2);
						return horizontalOverlap && verticalOverlap;
					});
					
					if (!collision) {
						const colorIndex = getColorIndex(word.text) % themeColors.length;
						placedWords.push({
							top,
							left,
							rotation,
							color: themeColors[colorIndex],
						});
						placed = true;
					}
					attempts++;
				}
			});
			
			setPositions(placedWords);
		};
		
		calculatePositions();
	}, [theme]);

	if (positions.length === 0) {
		return (
			<View style={[styles.container, { height: CONTAINER_HEIGHT }]} />
		);
	}

	return (
		<View style={[styles.container, { height: CONTAINER_HEIGHT }]}>
		{WORDS.map((w, idx) => {
			if (idx >= positions.length) return null;
			const { top, left, rotation, color } = positions[idx];
			const fontSize = 12 + w.weight * 1.6;
			return (
			<View
				key={idx}
				style={[
				styles.wordWrapper,{ 
					top,
					left,
					transform: [{ rotate: `${rotation}deg` }],
				}]}>
				<ThemedText
				style={[
					styles.word,
					{
					fontSize,
					color,
					opacity: 0.9 - (idx * 0.03),
					},
				]}>
				{w.text}
				</ThemedText>
			</View>
			);
		})}
		</View>
	);
}

const styles = StyleSheet.create({
  	container: {
		width: '100%',
		position: 'relative',
		marginVertical: 16,
	},
	wordWrapper: {
		position: 'absolute',
		padding: 4,
	},
	word: {
		fontWeight: '800',
		textShadowColor: 'rgba(0, 0, 0, 0.15)',
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 1,
	},
});

export default WordCloud;