import * as React from "react";
import { TouchableOpacity, Text, GestureResponderEvent, StyleSheet } from "react-native";

export interface ButtonProps {
  text: string;
  onClick?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  style?: object;
  variant?: "primary" | "secondary" | "tertiary" | "number"; // Added 'number' for number-specific buttons
}

export function Button({ text, onClick, style={}, disabled=false, variant = "primary" }: ButtonProps) {
  // Set the variant styles based on the variant prop
  const variantStyle = styles[variant] || styles.primary;

  return (
    <TouchableOpacity
      style={[styles.button, variantStyle, style, disabled && styles.disabled]}
      onPress={onClick}
      disabled={disabled}
    >
      <Text style={[styles.text, disabled && styles.disabledText]}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    maxWidth: 300,
    textAlign: "center",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
    fontSize: 18,
    marginVertical: 5,
  },
  text: {
    color: "white",
  },
  disabled: {
    backgroundColor: "grey", 
  },
  disabledText: {
    color: "black", 
  },
  primary: {
    backgroundColor: "#2f80ed",
  },
  secondary: {
    backgroundColor: "grey",
    borderColor: "#2f80ed",
    borderWidth: 1,
  },
  tertiary: {
    backgroundColor: "transparent",
    borderColor: "#2f80ed",
    borderWidth: 1,
  },
  number: {
    backgroundColor: "#E0E0E0",
    borderRadius: 50, 
  },
});
