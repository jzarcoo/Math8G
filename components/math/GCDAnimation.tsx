import React, { useState, useEffect, useRef } from 'react';
import { Platform, View, Text, TextInput, Button, StyleSheet, Animated, Easing } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';

interface Step {
  a: number;
  b: number;
}

export default function GCDAnimation() {
    const theme = useColorScheme();
    const [inputA, setInputA] = useState('24');
    const [inputB, setInputB] = useState('9');
    const [steps, setSteps] = useState<Step[]>([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [running, setRunning] = useState(false);
    const timeouts = useRef<(number | NodeJS.Timeout)[]>([]);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const fgColor = theme === 'light' ? '#000' : '#fff';
    const highlight = theme === 'light' ? 'lightcoral' : 'orange';
 // Compute gcd steps whenever inputs change
  useEffect(() => {
    const a0 = parseInt(inputA, 10);
    const b0 = parseInt(inputB, 10);
    if (isNaN(a0) || isNaN(b0) || a0 < 0 || b0 < 0) return;
    const s: Step[] = [];
    let a = a0, b = b0;
    while (b !== 0) {
      s.push({ a, b });
      const temp = b;
      b = a % b;
      a = temp;
    }
    s.push({ a, b });
    setSteps(s);
    setCurrentStep(0);
  }, [inputA, inputB]);

  // Animate loop over steps
  useEffect(() => {
    if (!steps.length) return;
    const timer = setInterval(() => {
      Animated.sequence([
        Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
      ]).start();
      setCurrentStep((c) => (c + 1 < steps.length ? c + 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [steps]);

  if (!steps.length) return null;
  const { a, b } = steps[currentStep];

    const styles = StyleSheet.create({
        container: {
            padding: 20,
            flex: 1,
        },
        inputRow: {
            padding: 16,
            alignItems: 'center',
            flexDirection: 'row',
            gap: 10,
        },
        input: {
            borderColor: theme === 'light' ? '#555' : '#aaa',
            borderWidth: 1,
            padding: 8,
            width: 60,
            backgroundColor: theme === 'light' ? '#fff' : '#1a1f28',
            borderRadius: 6,
            color: theme === 'light' ? '#000' : '#fff',
            textAlign: 'center',
        },
        stepsContainer: {
            flex: 1,
            // marginTop: 20,
            alignItems: 'center',
            flexDirection: 'column',
        },
        stepBox: {
            backgroundColor: theme === 'light' ? '#e8f4ff' : '#1f2937',
            borderRadius: 8,
            padding: 12,
            alignItems: 'center',
            // minWidth: 120,
            borderColor: theme === 'light' ? '#4dabf7' : '#1c64f2',
            borderWidth: 1,
        },
        code: {
            fontFamily: Platform.select({ ios: 'Courier', android: 'monospace' }),
            fontSize: 16,
            color: theme === 'light' ? '#1c7ed6' : '#74c0fc',
            fontWeight: '500',
        },
        resultBox: {
            padding: 12,
            backgroundColor: theme === 'light' ? '#d3f9d8' : '#0c5449',
            borderRadius: 8,
            alignItems: 'center',
            borderColor: theme === 'light' ? '#40c057' : '#099268',
            borderWidth: 1,
        },
        resultText: {
            color: theme === 'light' ? '#2b8a3e' : '#96f2d7',
            fontSize: 18,
            fontWeight: 'bold',
        },
    });

    // startAnimation();

    return (
        <View style={styles.container}>
            <View style={styles.inputRow}>
                <TextInput
                    style={[styles.input, { color: fgColor, borderColor: highlight }]}
                    value={inputA}
                    keyboardType="numeric"
                    editable={!running}
                    onChangeText={setInputA}
                />
                <TextInput
                    style={[styles.input, { color: fgColor, borderColor: highlight }]}
                    value={inputB}
                    keyboardType="numeric"
                    editable={!running}
                    onChangeText={setInputB}
                />
                {/* <Button 
                    title="Start" 
                    onPress={startAnimation} 
                    disabled={running} 
                    color={theme === 'light' ? 'lightcoral' : 'orange'}
                /> */}
            </View>

            <View style={styles.stepsContainer}>
                {steps
                    // .slice(Math.max(0, currentStep - 2), currentStep + 1)
                    .slice(0, currentStep + 1)
                    .map((step, index) => {
                        // const stepIndex = index + Math.max(0, currentStep - 2);
                        const stepIndex = index ;
                        return (
                            <Animated.View
                                key={stepIndex}
                                style={{
                                    opacity: currentStep === stepIndex ? fadeAnim : 0.4,
                                    transform: [{
                                        scale: currentStep === stepIndex 
                                            ? fadeAnim.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [0.9, 1.1]
                                            }) 
                                            : 1
                                    }],
                                    marginBottom: 12,
                                }}>
                                <View style={styles.stepBox}>
                                    <Text style={styles.code}>
                                        gcd({step.a}, {step.b})
                                    </Text>
                                </View>
                            </Animated.View>
                        );
                    })
                }
            </View>

            {/* {steps.length > 0 && !running && steps[steps.length - 1].b === 0 && (
                <View style={styles.resultBox}>
                    <Text style={styles.resultText}>
                        Resultado: {steps[steps.length - 1].a}
                    </Text>
                </View>
            )} */}
        </View>
    );
}