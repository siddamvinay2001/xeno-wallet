import { View, Text, Pressable, StyleSheet, Alert } from "react-native";
import PinInput from "@/components/PinInput";
import { useUserStore } from "@/store/UserStore";
import { useSession } from "@/providers/SessionProvider";
import { useRouter } from "expo-router";
import { useState } from "react";

const Password = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setPassword, addAccount, id } = useUserStore();
  const {setLogin}  = useSession();
  const router = useRouter();


  const handleSetPassword = () => {
    if (newPassword !== confirmPassword) {
      console.log("Passwords do not match.");
      return;
    }

    if (!/^\d{6}$/.test(newPassword)) {
      console.log("Passwords are not numeric.");
      return;
    }

    setPassword(newPassword);
    addAccount(
      {
        id: id,
        accountName: "Account " +(id+1),
      }
    )
    setLogin(true);
    router.replace('/')
  };

  const isInConfirmationMode = newPassword.length === 6;
  return (
    <View style={styles.container}>
      {!isInConfirmationMode && (
        <>
          <Text style={styles.header}>Set New Password</Text>
          <PinInput value={newPassword} onChange={setNewPassword} maxLength={6} />
        </>
      )}

      {isInConfirmationMode && (
        <>
          <Text style={styles.header}>Confirm New Password</Text>
          <PinInput value={confirmPassword} onChange={setConfirmPassword} maxLength={6} />
        </>
      )}

      {newPassword && confirmPassword && newPassword !== confirmPassword && (
        <Text style={styles.errorText}>Passwords do not match.</Text>
      )}
      {newPassword.length !== 6 && !isInConfirmationMode && (
        <Text style={styles.errorText}>Password must be exactly 6 digits.</Text>
      )}

      {isInConfirmationMode && (
        <Pressable
          style={[
            styles.button,
            (newPassword !== confirmPassword) && styles.disabledButton,
            (newPassword == confirmPassword) && styles.validButton,
          ]}
          onPress={handleSetPassword}
          disabled={newPassword !== confirmPassword}
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
  successText: {
    color: "green",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
});

export default Password;