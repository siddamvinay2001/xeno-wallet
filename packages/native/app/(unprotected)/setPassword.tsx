import { View, Text, Pressable, StyleSheet, Alert } from "react-native";
import PinInput from "@/components/PinInput";
import { useUserStore } from "@/store/UserStore";
import { useSession } from "@/providers/SessionProvider";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useOnboardStore } from "@/store/OnboardStore";

const Password = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setPassword, addAccount, id } = useUserStore();
  const {seedPhrase, blockChain} = useOnboardStore();
  const { setLogin } = useSession();
  const router = useRouter();

  const isValidPassword = newPassword.length === 6 && /^\d{6}$/.test(newPassword);
  const passwordsMatch = newPassword === confirmPassword;

  const handleSetPassword = () => {
    if (!isValidPassword) {
      console.log("Passwords must be 6 digits and numeric.");
      return;
    }
    setPassword(newPassword);
    addAccount({
      id: id,
      accountName: "Account " + (id + 1),
      mnemonicPhrase: seedPhrase,
      blockChains: [blockChain]
    });
    setLogin(true);
    router.replace('/');
  };

  const renderErrorText = () => {
    if (newPassword.length === 6 && !isValidPassword) {
      return <Text style={styles.errorText}>Password must be exactly 6 digits!</Text>;
    }
    if (newPassword.length === 6 && confirmPassword && !passwordsMatch) {
      return <Text style={styles.errorText}>Passwords do not match.</Text>;
    }
    return null;
  };

  const isInConfirmationMode = newPassword.length === 6;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {isInConfirmationMode ? "Confirm New Password" : "Set New Password"}
      </Text>
      
      <PinInput
        value={isInConfirmationMode ? confirmPassword : newPassword}
        onChange={isInConfirmationMode ? setConfirmPassword : setNewPassword}
        maxLength={6}
      />

      {renderErrorText()}

      {isInConfirmationMode && (
        <Pressable
          style={[
            styles.button,
            !passwordsMatch && styles.disabledButton,
            passwordsMatch && styles.validButton,
          ]}
          onPress={handleSetPassword}
          disabled={!passwordsMatch}
        >
          <Text style={styles.buttonText}>Set Password</Text>
        </Pressable>
      )}
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
  validButton: {
    backgroundColor: "#28a745",
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
});

export default Password;
