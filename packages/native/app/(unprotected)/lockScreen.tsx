import React, { useState } from "react";
import { View, Text, StyleSheet, Alert, useWindowDimensions } from "react-native";
import { useRouter } from "expo-router";
import { useUserStore } from "@/store/UserStore";
import { useSession } from "@/providers/SessionProvider";
import { Button, CodeInput } from "@xeno/ui";  // Using Button and CodeInput from your UI library

const LockScreenPage = () => {
  const [enteredPin, setEnteredPin] = useState(""); // State to hold the user's entered PIN
  const { password } = useUserStore(); // Assuming 'password' holds the saved PIN
  const { setLogin } = useSession(); // To manage login state
  const router = useRouter();
  const { width } = useWindowDimensions(); // For responsive layout

  // Handle the PIN verification
  const handleVerifyPin = () => {
    if (enteredPin === password) {
      setLogin(true); // Set login state to true
      router.replace('/'); // Navigate to the main screen
    } else {
      Alert.alert("Incorrect PIN", "The PIN you entered is incorrect.");
    }
  };

  // Check if the PIN entered is valid
  const isValidPin = enteredPin.length === 6 && enteredPin === password;

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <Text style={styles.header}>Enter Your PIN</Text>
      </View>

      {/* Pin Input Component */}
      <CodeInput 
        code={enteredPin} 
        onCodeChange={setEnteredPin} 
        maxLength={6} 
      />

      {/* Error and Success Messages */}
      {enteredPin.length === 6 && enteredPin !== password && (
        <Text style={styles.errorText}>Incorrect PIN. Please try again.</Text>
      )}

      {enteredPin.length === 6 && enteredPin === password && (
        <Text style={styles.successText}>PIN Verified! Unlocking...</Text>
      )}

      {/* Unlock Button */}
      <Button
        text="Unlock"
        onClick={handleVerifyPin}
        disabled={enteredPin.length !== 6 || !isValidPin}
        style={styles.button}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  headerWrapper: {
    alignItems: "center", 
    marginBottom: 40, 
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 20,
    maxWidth: 300, // Ensure button is responsive
  },
  disabledButton: {
    backgroundColor: "#cccccc",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 10,
    textAlign: "center",
  },
  successText: {
    color: "green",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
});

export default LockScreenPage;
