
import React, { useEffect } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

interface CellProps {
    num: number;
    size: number;
    isPrime: boolean;
    cellColor: string;
    smallPrime: number;
    completed: boolean;
    highlightedIndex: number | null;
    marcaMultiplos: (num: number) => void;
}

function Cell({
                num,
                size,
                isPrime,
                cellColor,
                smallPrime,
                completed,
                highlightedIndex,
                marcaMultiplos
            }: CellProps) {
    const progress = useSharedValue(0);
    const isSmallPrime = smallPrime === num;
    const fillColor = cellColor || '#fff';
    const isHighlighting = highlightedIndex === num;

    useEffect(() => {
        if (fillColor !== '#fff') {
            progress.value = withTiming(1, { duration: 100 });
        } else {
            progress.value = withTiming(0, { duration: 100 });
        }
    }, [fillColor, progress]);

    const animatedStyle = useAnimatedStyle(() => ({
        width: size,
        height: size,
        margin: 1,
        backgroundColor: isHighlighting ? '#999' : isSmallPrime ? '#fff' : progress.value === 1 ? fillColor : '#fff',
        borderColor: isSmallPrime ? fillColor : '#333',
        borderWidth: isSmallPrime ? 10 : 1,
        opacity: (!completed || isPrime) ? 1 : 0,
        justifyContent: 'center',
        alignItems: 'center',
    }));

    return (
        <TouchableOpacity onPress={() => marcaMultiplos(num)}>
            <Animated.View style={animatedStyle}>
                <Text style={{ 
                    color: isSmallPrime ? fillColor : '#333', 
                    fontSize: size / 4, 
                    fontWeight: isSmallPrime ? 'bold' : 'normal' 
                }}>
                    {num}
                </Text>
            </Animated.View>
        </TouchableOpacity>
    );
}

export default Cell;