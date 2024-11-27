import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, useWindowDimensions } from "react-native";
import { useRouter } from "expo-router";
import { useUserStore } from "@/store/UserStore";
import { useOnboardStore } from "@/store/OnboardStore";
import { useSession } from "@/providers/SessionProvider";
import { Button, CodeInput } from "@xeno/ui";

const Password = () => {
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const { setPassword, addAccount, id } = useUserStore();
  const { seedPhrase, blockChain } = useOnboardStore();
  const { setLogin } = useSession();
  const router = useRouter();
  const { width } = useWindowDimensions(); // Get the window width for responsive design

  const isValidPassword = newPassword.length === 6 && /^\d{6}$/.test(newPassword);
  const passwordsMatch = newPassword === confirmPassword;

  const handleSetPassword = () => {
    if (!isValidPassword) {
      console.log("Passwords must be 6 digits and numeric.");
      return;
    }
    setPassword(newPassword);
    addAccount({
      id,
      accountName: "Account " + (id + 1),
      mnemonicPhrase: seedPhrase,
      blockChains: [blockChain],
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
      <View style={styles.headerWrapper}>
        <Text style={styles.header}>
          {isInConfirmationMode ? "Confirm New Password" : "Set New Password"}
        </Text>
        {renderErrorText()}
      </View>

      <CodeInput
        code={isInConfirmationMode ? confirmPassword : newPassword}
        onCodeChange={isInConfirmationMode ? setConfirmPassword : setNewPassword}
        maxLength={6}
      />
      {isInConfirmationMode && (
        <Button text={"Set Password"} onClick={handleSetPassword} disabled={!passwordsMatch} />
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
  }
});

export default Password;
