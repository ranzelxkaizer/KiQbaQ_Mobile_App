import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

export default function AnimatedLogo() {
  const scanLinePosition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Create the scanning animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanLinePosition, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scanLinePosition, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const scanLineTranslateY = scanLinePosition.interpolate({
    inputRange: [0, 1],
    outputRange: [-40, 40], // Scan from top to bottom of the Q
  });

  return (
    <View style={styles.logoContainer}>
      {/* KiQba part */}
      <Text style={styles.logoText}>KiQba</Text>
      
      {/* Q with scanning frame */}
      <View style={styles.qContainer}>
        {/* Scanning frame corners */}
        <View style={styles.scanFrame}>
          {/* Top-left corner */}
          <View style={[styles.corner, styles.topLeft]} />
          {/* Top-right corner */}
          <View style={[styles.corner, styles.topRight]} />
          {/* Bottom-left corner */}
          <View style={[styles.corner, styles.bottomLeft]} />
          {/* Bottom-right corner */}
          <View style={[styles.corner, styles.bottomRight]} />
        </View>
        
        {/* The Q letter */}
        <Text style={styles.qLetter}>Q</Text>
        
        {/* Animated scanning line */}
        <Animated.View
          style={[
            styles.scanLine,
            {
              transform: [{ translateY: scanLineTranslateY }],
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#00b4d8',
  },
  qContainer: {
    position: 'relative',
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qLetter: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#00b4d8',
  },
  scanFrame: {
    position: 'absolute',
    width: 70,
    height: 70,
  },
  corner: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderColor: '#00b4d8',
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 3,
    borderLeftWidth: 3,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 3,
    borderRightWidth: 3,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 3,
    borderRightWidth: 3,
  },
  scanLine: {
    position: 'absolute',
    width: 60,
    height: 2,
    backgroundColor: '#00b4d8',
    opacity: 0.8,
    shadowColor: '#00b4d8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
});