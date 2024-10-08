import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { SIZES, COLORS } from '@/constants/Colors';
const Screen = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Your new next wallet</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: COLORS.primary }]} 
          accessibilityLabel="Create a new wallet" 
          onPress={() => {/* Handle wallet creation */}}
        >
          <Text style={styles.buttonText}>Create a new Wallet</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: COLORS.secondary }]} 
          accessibilityLabel="Import from existing wallet" 
          onPress={() => {/* Handle wallet import */}}
        >
          <Text style={styles.buttonText}>Import from existing wallet</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  title: {
    fontSize: SIZES.titleFontSize,
    fontWeight: 'bold',
  },
  buttonContainer: {
    alignItems: 'center',
    gap: 5,
    flexDirection: 'column',
  },
  button: {
    width: SIZES.buttonWidth,   // Set fixed width
    height: SIZES.buttonHeight,  // Set fixed height
    padding: SIZES.buttonPadding,
    borderRadius: 5,
    justifyContent: 'center',     // Center the text vertically
    alignItems: 'center',         // Center the text horizontally
  },
  buttonText: {
    color: COLORS.buttonText,
    fontSize: SIZES.buttonFontSize,
  },
});

export default Screen;
