import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Button } from "@xeno/ui";
import { useUserStore } from "@/store/UserStore";
const Screen = () => {
  const router = useRouter();
  const { accounts, addAccount } = useUserStore();
  console.log("Accounts : ", accounts);


  return (
    <View style={styles.container}>
      <View>
        <Text >Your new next wallet</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          text="Create a new Wallet"
          onClick={() => {
            router.push("/(unprotected)/creation/0");
          } }/>
          <Button text={"Import from existing wallet"} onClick={() => {
            router.push("/(unprotected)/creation/1");
          }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  buttonContainer: {
    alignItems: "center",
    gap: 5,
    flexDirection: "column",
  }
});

export default Screen;
