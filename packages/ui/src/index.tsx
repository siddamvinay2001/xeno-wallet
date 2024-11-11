import * as React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
  Text,
  View
} from "react-native";
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export interface ButtonProps {
  text: string;
  onClick?: (event: GestureResponderEvent) => void;
}

export function Button({ text, onClick }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onClick}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

interface DropdownProps {
  label: string;
  options: { label: string; value: any }[];
  onSelect: (value: any) => void;
}

export function Dropdown({ label, options, onSelect }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(options[0]?.value);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: { label: string; value: any }) => {
    setSelectedValue(option.value);
    onSelect(option.value);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dropdown} onPress={toggleDropdown}>
        <Text style={styles.label}>{label}</Text>
        {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.optionsContainer}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                option.value === selectedValue && styles.selectedOption,
              ]}
              onPress={() => handleOptionSelect(option)}
            >
              <Text
                style={[
                  styles.optionText,
                  option.value === selectedValue && styles.selectedOptionText,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    maxWidth: 200,
    textAlign: "center",
    borderRadius: 10,
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 30,
    paddingRight: 30,
    fontSize: 15,
    backgroundColor: "#2f80ed",
  },
  text: {
    color: "white",
  },
  container: {
    width: '100%',
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionsContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginTop: 8,
    overflow: 'hidden',
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  selectedOption: {
    backgroundColor: '#e0e0e0',
  },
  optionText: {
    fontSize: 16,
  },
  selectedOptionText: {
    fontWeight: 'bold',
  },
});