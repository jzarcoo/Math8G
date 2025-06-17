import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Animated,
  ScrollView,
} from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function BinPowAnimation() {
  const theme = useColorScheme();
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
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let seq: { a: number; res: number; bits: string[]; b: number }[] = [];
    let a = base;
    let b = exponent;
    let res = 1;
    const bits = exponent.toString(2).split('').reverse();
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
      Animated.sequence([
        Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
      ]).start();
      setCurrent((c) => (c + 1 < steps.length ? c + 1 : 0));
    }, 3000);
    return () => clearInterval(timer);
  }, [steps]);

  if (!steps.length) return null;
  const { a, res, bits, b } = steps[current];
  
  const bitPos = current - 1;

  return (
    <ScrollView style={[styles.container]}>      
      <View style={styles.inputs}>
        <Text style={[styles.label, { color: fgColor }]}>Base:</Text>
        <TextInput
          style={[styles.input, { color: fgColor, borderColor: highlight }]}
          keyboardType="number-pad"
          value={String(base)}
          onChangeText={(t) => setBase(Number(t) || 0)}
        />
        <Text style={[styles.label, { color: fgColor }]}>Exp:</Text>
        <TextInput
          style={[styles.input, { color: fgColor, borderColor: highlight }]}
          keyboardType="number-pad"
          value={String(exponent)}
          onChangeText={(t) => setExponent(Number(t) || 0)}
        />
      </View>

      <View style={styles.binaryContainer}>
        {bits.map((bit, idx) => (
          <Text
            key={idx}
            style={[
              styles.bit,
              { color: fgColor },
              idx === bitPos && { color: highlight, fontWeight: 'bold' },
            ]}>
            {bit}
          </Text>
        ))}
      </View>
      <View style={styles.arrowContainer}>
        {bits.map((_, idx) => (
          <Text
            key={idx}
            style={idx === bitPos ? [styles.arrow, { color: highlight }] : styles.arrowPlaceholder}>
            ↑
          </Text>
        ))}
      </View>

      <Animated.View style={{ opacity: fadeAnim, marginTop: 20 }}>
        {/* <Text style={[styles.text, { color: fgColor }]}>Iteración: {current}</Text> */}
        <Text style={[styles.text, { color: fgColor }]}>a = {a}</Text>
        <Text style={[styles.text, { color: fgColor }]}>res = {res}</Text>
        <Text style={[styles.text, { color: fgColor }]}>b = {b}</Text>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  inputs: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  label: { fontSize: 16 },
  input: { borderWidth: 1, padding: 6, width: 60, borderRadius: 6, textAlign: 'center' },
  binaryContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 16 },
  bit: { fontSize: 24, marginHorizontal: 4 },
  arrowContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: -8 },
  arrow: { fontSize: 22, marginHorizontal: 8 , fontWeight: 'bold'},
  arrowPlaceholder: { fontSize: 18, marginHorizontal: 8, color: 'transparent' },
  text: { fontSize: 18, marginVertical: 4 },
});