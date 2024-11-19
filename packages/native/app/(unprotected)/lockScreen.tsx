import React, { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, Alert } from "react-native";
import PinInput from "@/components/PinInput";  // Reusing your PinInput component
import { useUserStore } from "@/store/UserStore";  // To access the stored password
import { useSession } from "@/providers/SessionProvider";
import { useRouter } from "expo-router";

const LockScreen = () => {
  const [enteredPin, setEnteredPin] = useState(""); // State to hold the user's entered PIN
  const { password, reset } = useUserStore();  // Assuming 'password' holds the saved PIN
  const { setLogin } = useSession();  // To manage login state
  const router = useRouter();

  

  // Function to handle PIN verification
  const handleVerifyPin = () => {
    if (enteredPin === password) {
      // PIN is correct, unlock access
      setLogin(true);  // Set the login state to true
      router.replace('/');  // Navigate to the main screen
    } else {
      // Show error if the PIN is incorrect
      Alert.alert("Incorrect PIN", "The PIN you entered is incorrect.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Enter Your PIN</Text>
      <PinInput value={enteredPin} onChange={setEnteredPin} maxLength={6} />

      {enteredPin.length === 6 && enteredPin !== password && (
        <>
        <Text style={styles.errorText}>Incorrect PIN. Please try again.</Text>
        </>
      )}

      {enteredPin.length === 6 && enteredPin === password && (
        <>
        <Text style={styles.successText}>PIN Verified! Unlocking...</Text>
        </>
      )}

      <Pressable
        style={[
          styles.button,
          enteredPin.length === 6 && enteredPin !== password && styles.disabledButton,
        ]}
        onPress={handleVerifyPin}
        disabled={enteredPin.length !== 6 || enteredPin !== password}
      >
        <Text style={styles.buttonText}>Unlock</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 20,
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

export default LockScreen;
