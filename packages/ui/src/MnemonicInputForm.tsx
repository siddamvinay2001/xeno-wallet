// src/common/MnemonicInputForm.tsx
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import {CustomInput} from "./ui/CustomInput";
import { Button } from "./ui/Button";
import { Dropdown } from "./ui/Dropdown";

interface MnemonicInputFormProps {
  seedPhrase: string;
  newWallet: boolean;
  onChange: (text: string, index: number) => void;
  network: string;
  setNetwork: (network: string) => void;
  onCopy: () => void;
  isCopied: boolean;
  onContinue: () => void;
}

export const MnemonicInputForm: React.FC<MnemonicInputFormProps> = ({
  seedPhrase,
  newWallet,
  onChange,
  network,
  setNetwork,
  onCopy,
  isCopied,
  onContinue
}) => {
  const words = seedPhrase.split(" ").slice(0, 12); 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mnemonic Phrase</Text>
      <ScrollView contentContainerStyle={styles.hero}>
        <View style={styles.phraseInputWrapper}>
          {words.map((word, index) => (
            <CustomInput
              key={index}
              index={index}
              content={word}
              onChangeHandler={(text) => onChange(text, index)}
              newWallet={newWallet}
              containerStyle={styles.customInputContainer}
              inputStyle={styles.customInput}
            />
          ))}
        </View>

        <View style={styles.copyButtonContainer}>
          <Button
            text={isCopied ? "Copied!" : "Copy seed phrase"}
            onClick={onCopy}
            style={styles.copyButton}
            disabled={isCopied}
            variant="secondary"
          />
        </View>

        <Dropdown
          label={network}
          options={[
            { label: "Ethereum", value: "ETH" },
            { label: "Bitcoin", value: "BTC" },
            { label: "Solana", value: "SOL" },
          ]}
          onSelect={setNetwork}
        />

        <View style={styles.continueButtonContainer}>
          <Button
            text="Continue"
            onClick={onContinue}
            variant="primary"
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  hero: {
    flex: 1,
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  phraseInputWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  customInputContainer: {
    width: "46%",
    marginVertical: 10,
  },
  customInput: {
    paddingLeft: 10,
  },
  copyButtonContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  copyButton: {
    padding: 10,
  },
  continueButtonContainer: {
    alignItems: "center",
    marginTop: 20,
  },
});

