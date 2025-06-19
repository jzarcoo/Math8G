import React, { useState, useEffect } from 'react';
import {
	View,
	TextInput,
	StyleSheet,
	ScrollView,
} from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedText } from '@/components/ThemedText';

export default function BinPowAnimation() {
	const fgColor = useColorScheme() === 'light' ? '#000' : '#fff';
	const highlight = useColorScheme() === 'dark' ? '#ffa500' : '#f08080';
	const [base, setBase] = useState(3);
	const [exponent, setExponent] = useState(13);
	const [steps, setSteps] = useState<{
		a: number;
		res: number;
		bits: string[];
		b: number;
	}[]>([]);
	const [current, setCurrent] = useState(0);

	useEffect(() => {
		const bits = exponent.toString(2).split('');
		let seq: { a: number; res: number; bits: string[]; b: number }[] = [];
		let a = base;
		let b = exponent;
		let res = 1;
		seq.push({ a, res, bits, b });
		
		while (b) {
			if (b & 1) res *= a;
			a *= a;
			b >>= 1; 
			seq.push({ a, res, bits, b });     
		}
		
		setSteps(seq);
		setCurrent(0);
	}, [base, exponent]);

	useEffect(() => {
		if (!steps.length) return;
		const timer = setInterval(() => {
		setCurrent((c) => (c + 1 < steps.length ? c + 1 : 0));
		}, 2000);
		return () => clearInterval(timer);
	}, [steps]);

	if (!steps.length) return null;
	const { bits } = steps[current];
	
	const currentBitPosition = current > 0 
		? bits.length - current 
		: -1;

	return (
		<ScrollView style={[styles.container]}>      
		<View style={styles.inputs}>
			<ThemedText style={[styles.label, { color: fgColor }]}>Base:</ThemedText>
			<TextInput
			style={[styles.input, { color: fgColor, borderColor: highlight }]}
			keyboardType="number-pad"
			value={String(base)}
			onChangeText={(t) => setBase(Number(t) || 0)}
			/>
			<ThemedText style={[styles.label, { color: fgColor }]}>Exp:</ThemedText>
			<TextInput
			style={[styles.input, { color: fgColor, borderColor: highlight }]}
			// keyboardType="number-pad"
			value={String(exponent)}
			onChangeText={(t) => 
			{
				if(Number(t) < 0)
				{
					setBase(1 / base);
					setExponent(Math.abs(Number(t)));
				}
				else
				{
					setBase(base);
					setExponent(Number(t));
				}
			}
			}
			/>
		</View>

		<View style={styles.binaryContainer}>
			{bits.map((bit, idx) => (
			<ThemedText
				key={idx}
				style={[
				styles.bit,
				idx === currentBitPosition && { color: highlight, fontWeight: 'bold' },
				]}>
				{bit}
			</ThemedText>
			))}
		</View>

		<View style={styles.stepsContainer}>
			{steps.slice(0, current + 1).map((step, idx) => (
			<View 
				key={idx} 
				style={[
				styles.stepRow,
				idx === current && { backgroundColor: highlight + '22' }
				]}
			>
				<ThemedText style={styles.stepText}>
				{/* {`Iteración ${idx}: ${idx > 0 ? `(bit=${step.bits[step.bits.length - idx]}) ` : ''}`} */}
				{`${idx > 0 ? `Iteración ${idx}: ` : ''}`}
				</ThemedText>
				<ThemedText style={styles.stepText}>res = {step.res}, </ThemedText>
				<ThemedText style={styles.stepText}>a = {step.a}</ThemedText>
			</View>
			))}
		</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 16 },
	inputs: { 
		flexDirection: 'row', 
		alignItems: 'center', 
		gap: 8,
		marginBottom: 20 
	},
	label: { fontSize: 16 },
	input: { 
		borderWidth: 1, 
		padding: 8, 
		width: 60, 
		borderRadius: 8, 
		textAlign: 'center' 
	},
	binaryContainer: { 
		flexDirection: 'row', 
		justifyContent: 'center', 
		marginBottom: 10
	},
	bit: { 
		fontSize: 24, 
		marginHorizontal: 8,
		minWidth: 24,
		textAlign: 'center'
	},
	stepsContainer: {
		marginTop: 10,
		// borderTopWidth: 1,
		// borderTopColor: '#444',
		paddingTop: 15
	},
	stepRow: {
		padding: 12,
		borderRadius: 8,
		marginVertical: 6,
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
	stepText: {
		fontSize: 16,
		marginRight: 8,
	}
});