import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

const PinInput = ({ value, onChange, maxLength }) => {
  const codeLength = Array(maxLength).fill(0);

  const onNumberPress = (number) => {
    if (value.length < maxLength) {
      onChange(value + number); // Add the number to the current value
    }
  };

  const onBackspacePress = () => {
    onChange(value.slice(0, -1)); // Remove the last character from the value
  };

  return (
    <View style={styles.container}>
      {/* Code Entry Dots */}
      <View style={styles.codeView}>
        {codeLength.map((_, index) => (
          <View
            key={index}
            style={[
              styles.codeEmpty,
              { backgroundColor: value[index] ? "#3D38ED" : "#D8DCE2" },
            ]}
          />
        ))}
      </View>

      {/* Number Pad */}
      <View style={styles.numbersView}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, "0"].map((item, index) => (
          <Pressable
            key={index}
            onPress={() => onNumberPress(String(item))}  // Ensure item is treated as a string
            style={styles.numberButton}
          >
            <Text style={styles.number}>{item}</Text> {/* Correct placement of the Text component */}
          </Pressable>
        ))}
        {/* Backspace Button */}
        <Pressable onPress={onBackspacePress} style={styles.numberButton}>
          <Text style={styles.number}>{'\u232B'}</Text> {/* Unicode for backspace */}
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 30,
  },
  codeView: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
    gap: 20,
    alignItems: "center",
  },
  codeEmpty: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#D8DCE2",
  },
  numbersView: {
    width: "80%", // Adjust container width for 3 columns
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
  numberButton: {
    width: "30%", // 30% width for 3 columns
    aspectRatio: 1, // Ensures buttons are square
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 30,
    backgroundColor: "#E0E0E0",
  },
  number: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
});

export default PinInput;
