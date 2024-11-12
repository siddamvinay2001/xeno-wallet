import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useEffect } from "react";
import { useUserStore } from "@/store/UserStore";
import { SafeAreaView } from "react-native-safe-area-context";

const LockScreen = () => {
  const { accounts } = useUserStore();
  const [code, setCode] = React.useState("");
  const codeLength = Array(6).fill(0);

  useEffect(() => {
    if (code.length === 6) {
      // TODO: Handle full code entry
    }
  }, [code]);

  const onNumberPress = (number) => {
    if (code.length < 6) {
      setCode((prev) => prev + number);
    }
  };

  const onBackspacePress = () => {
    setCode((prev) => prev.slice(0, -1));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.greeting}>Welcome back!</Text>
      
      {/* Code Entry Dots */}
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
      
      {/* Number Pad */}
      <View style={styles.numbersView}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, "0", "⌫"].map((item, index) => (
          <Pressable
            key={index}
            onPress={() => (item === "⌫" ? onBackspacePress() : onNumberPress(item))}
            style={styles.numberButton}
          >
            <Text style={styles.number}>{item}</Text>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 80,
    alignSelf: "center",
  },
  codeView: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 100,
    gap: 20,
    alignItems: "center",
  },
  codeEmpty: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  numbersView: {
    width: "80%", // Adjust container width for 3 columns
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
  numberButton: {
    width: "30%", // 30% width for 3 columns
    aspectRatio: 1, // Ensures buttons are square
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 30,
    backgroundColor: "#E0E0E0",
  },
  number: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
});

export default LockScreen;
