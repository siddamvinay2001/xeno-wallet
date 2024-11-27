import React from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { Button } from "./ui/Button";

interface CodeInputProps {
  code: string;
  onCodeChange: (code: string) => void;
  maxLength: number;
}

export const CodeInput = ({ code, onCodeChange, maxLength }: CodeInputProps) => {
  const { width } = useWindowDimensions(); // Get screen width to handle responsiveness
  const codeLength = Array(maxLength).fill(0);

  const handleNumberPress = (number: string) => {
    if (code.length < maxLength) {
      onCodeChange(code + number);
    }
  };

  const handleBackspacePress = () => {
    onCodeChange(code.slice(0, -1));
  };

  const buttonsWidth = width < 600 ? "29%" : width < 900 ? "38%": "44%";

  return (
    <View style={styles.container}>
      {/* Display the code input view */}
      <View style={[{flexDirection: "column", width: "100%", alignItems: "center"}]}>
        <View style={styles.codeView}>
          {codeLength.map((_, index) => (
            <View
              key={index}
              style={[
                styles.codeEmpty,
                { backgroundColor: code[index] ? "#3D38ED" : "#D8DCE2" },
              ]}
            />
          ))}
        </View>

        {/* Number Buttons with dynamic width */}
        <View style={styles.numbersView}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, "0"].map((item, index) => (
            <Button
              key={index}
              text={String(item)}
              onClick={() => handleNumberPress(String(item))}
              variant="number" // Assuming 'Button' component supports 'variant' prop
              style={[
                styles.numberButton,
                {
                  width: buttonsWidth, // Adjust button width dynamically
                  marginBottom: width < 600 ? 10 : 15, // Add some margin between rows
                },
              ]}
            />
          ))}
        </View>

        {/* Backspace Button */}
        <Button
          text={'\u232B'}
          onClick={handleBackspacePress}
          variant="number"
          style={[
            styles.numberButton,
            styles.backspaceButton,
            {
              width: buttonsWidth,
              marginBottom: width < 600 ? 10 : 15, 
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 30,
    paddingHorizontal: 15,
  },
  codeView: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
    gap: 10,
    alignItems: "center",
  },
  codeEmpty: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#D8DCE2",
  },
  numbersView: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  numberButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#E0E0E0",
    marginHorizontal: 5,
  },
  backspaceButton: {
    backgroundColor: "#f0a0a0",
  },
});
