import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

const PinInput = ({ value, onChange, maxLength }) => {
  const codeLength = Array(maxLength).fill(0);

  const onNumberPress = (number) => {
    if (value.length < maxLength) {
      onChange(value + number);
    }
  };

  const onBackspacePress = () => {
    onChange(value.slice(0, -1)); 
  };

  return (
    <View style={styles.container}>
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
      <View style={styles.numbersView}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, "0"].map((item, index) => (
          <Pressable
            key={index}
            onPress={() => onNumberPress(String(item))}
            style={styles.numberButton}
          >
            <Text style={styles.number}>{item}</Text>
          </Pressable>
        ))}
        <Pressable onPress={onBackspacePress} style={styles.numberButton}>
          <Text style={styles.number}>{'\u232B'}</Text>
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
    width: "80%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
  numberButton: {
    width: "30%",
    aspectRatio: 1, 
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
