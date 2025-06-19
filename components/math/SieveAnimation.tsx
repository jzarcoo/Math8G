import React, { useState, useEffect, useRef } from 'react';
import { View, Button, StyleSheet, Dimensions } from 'react-native';
import Cell from './Cell';
import { Sieve } from './Sieve';
import { useColorScheme } from 'react-native';

const { width: WINDOW_WIDTH } = Dimensions.get('window');
const GRID_PADDING = 0;

const COLORS = [
    'orange',
    'gold',
    'tomato',
    'turquoise',
    'lime',
    'violet',
    'lightcyan',
    'lightpink',
    'lightyellow',
    'lightgreen',
    'lightblue',
    'green',
    'magenta',
    'blue',
    'red',
    'peachpuff',
    'honeydew',
    'powderblue',
    'mistyrose',
    'thistle',
    'cornsilk',
    'lavender',
    'mediumblue',
];

function Criba({ limit }: { limit: number }) {
    const theme = useColorScheme(); 
    limit += 1;
    const size = Math.min(20, WINDOW_WIDTH / 70);
    const cellSize = (WINDOW_WIDTH - GRID_PADDING * 2) / size;
    const timeouts = useRef<number[]>([]);
    // Arreglo para almacenar si un número es primo
    const [isPrime, setIsPrime] = useState<boolean[]>([]);
    // Arreglo para almacenar el color de cada celda
    const [cellColors, setCellColors] = useState<string[]>([]);
    // Indice de la celda resaltada
    const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
    // Bandera para indicar si la animación ha terminado
    const [completed, setCompleted] = useState(false);
    // bandera para indicar si la animacion esta corriendo
    const [animationRunning, setAnimationRunning] = useState(false);
    // primo menor de cada numero
    const [smallPrime, setSmallPrime] = useState<number[]>([]);
    // color indice
    const [colorIndex, setColorIndex] = useState(0);

    const reset = React.useCallback(() => {
        timeouts.current.forEach(clearTimeout);
        timeouts.current = [];
        const arr = Array(limit + 1).fill(true);
        arr[0] = false;
        arr[1] = false;
        setIsPrime(arr);
        setHighlightedIndex(null);
        setCellColors(Array(limit + 1).fill('#fff'));
        setCompleted(false);
        setAnimationRunning(false);
        setColorIndex(0);
        setSmallPrime(Array(limit + 1).fill(Infinity));
    }, [limit]);

    useEffect(() => {
        reset();
    }, [limit, reset]);

    const run = () => {
        if (animationRunning) return;
        reset();
        setAnimationRunning(true);
        const sieve = new Sieve(limit);
        const steps = sieve.getSteps();
        let localColorIndex = 0;
        let baseColorMap: { [key: number]: string } = {};
        steps.forEach((step, i) => {
            const timeout = setTimeout(() => {
                if (!(step.base in baseColorMap)) {
                    baseColorMap[step.base] = COLORS[localColorIndex % COLORS.length];
                    localColorIndex++;
                }
                const color = baseColorMap[step.base];
                setIsPrime(prev => {
                    const next = [...prev];
                    next[step.multiple] = false;
                    return next;
                });
                setHighlightedIndex(step.multiple);
                setCellColors(prev => {
                    const updated = [...prev];
                    updated[step.multiple] = color;
                    return updated;
                });
            }, i*100);
            timeouts.current.push(timeout);
        });
        const finalTimeout = setTimeout(() => {
            setCompleted(true);
            setHighlightedIndex(null);
        }, steps.length*100);
        timeouts.current.push(finalTimeout);
        const resetTimeout = setTimeout(() => {
            run();
        }, steps.length*150 + 500);
        timeouts.current.push(resetTimeout);
    };

    const marcaMultiplos = (base: number) => {
        if (
            base < 2 || animationRunning || 
            // Marcado por primos menores
            (cellColors[base] !== '#fff' && smallPrime[base] !== base)
        ) return;
        if (cellColors[base] !== '#fff') { // Desmarca
            setSmallPrime(prev => {
                const updated = [...prev];
                for (let i = base ; i < limit; i += base) {
                    if (updated[i] === base) updated[i] = Infinity;
                }
                return updated;
            });
            setCellColors(prev => {
                const updated = [...prev];
                for (let i = base ; i < limit; i += base) {
                    if (smallPrime[i] === base) updated[i] = '#fff';
                }
                return updated;
            });
            return;
        }
        // Marca multiplos
        setSmallPrime(prev => {
            const updated = [...prev];
            for (let i = base ; i < limit; i += base) {
                if (base < smallPrime[i]) updated[i] = base;
            }
            return updated;
        });
        const color = COLORS[colorIndex % COLORS.length];
        setColorIndex(prev => prev + 1);
        setCellColors(prev => {
            const updated = [...prev];
            for (let i = base ; i < limit; i += base) {
                if (base < smallPrime[i]) updated[i] = color;
            }
            return updated;
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttonRow}>
                <Button title="Run Animation" onPress={run} disabled={completed} color={theme === 'dark' ? buttonColors.dark.backgroundColor : buttonColors.light.backgroundColor} />
                <Button title="Reset Animation" onPress={reset} color={theme === 'dark' ? buttonColors.dark.backgroundColor : buttonColors.light.backgroundColor} />
            </View>
            <View style={[styles.grid, { padding: GRID_PADDING }]}>  
                {Array.from({ length: limit }, (_, idx) => (
                <Cell
                    key={idx}
                    num={idx}
                    size={cellSize}
                    isPrime={isPrime[idx]}
                    cellColor={cellColors[idx]}
                    smallPrime={smallPrime[idx]}
                    completed={completed}
                    highlightedIndex={highlightedIndex}
                    marcaMultiplos={marcaMultiplos}
                />
                ))}
            </View>
        </View>
  );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1 
    },
    buttonRow: { 
        padding: 16, 
        alignItems: 'center', 
        flexDirection: 'row', 
        justifyContent: 'space-around', 
    },
    grid: { 
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'center' 
    },
});

const buttonColors = {
  light: {
    backgroundColor: '#A1CEDC',
  },
  dark: {
    backgroundColor: '#1D3D47',
  },
};

export default Criba;
