import React from "react";
import { View, TextInput, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";

interface CustomInputProps {
  index: number;
  content: string;
  onChangeHandler: (text: string) => void;
  newWallet: boolean;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  placeholder?: string;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  index,
  content,
  onChangeHandler,
  newWallet,
  containerStyle,
  inputStyle,
  labelStyle,
  placeholder = "Enter phrase",
}) => {
  return (
    <View style={[styles.inputContainer, containerStyle]}>
      <Text style={[styles.inputLabel, labelStyle]}>{`${index + 1}.`}</Text>
      <TextInput
        style={[styles.textInput, inputStyle]}
        value={content}
        onChangeText={onChangeHandler}
        placeholder={placeholder}
        editable={!newWallet}
        placeholderTextColor="grey"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  inputLabel: {
    marginRight: 5,
    fontWeight: "bold",
    color: "black",
  },
  textInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    padding: 5,
    fontSize: 16,
    color: "black",
    minHeight: 40,
  },
});

