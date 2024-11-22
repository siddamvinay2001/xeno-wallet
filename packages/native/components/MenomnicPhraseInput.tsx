import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Platform,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";
import Clipboard from '@react-native-clipboard/clipboard';
import { Button, Dropdown } from "@xeno/ui";
import { useUserStore } from "@/store/UserStore";
import { useRouter } from "expo-router";
import { BUTTON_STYLES, FONT_STYLES, COLORS } from "@/constants/Constants";
import { useOnboardStore } from "@/store/OnboardStore";

// Enum for network names
enum NetworkName {
  Solana = "Solana",
  Bitcoin = "Bitcoin",
  Ethereum = "Ethereum",
}

// Define types for PhraseInput component props
interface PhraseInputProps {
  index: number;
  content: string;
  onChangeHandler: (text: string) => void;
  newWallet: boolean;
}

// Reusable PhraseInput component
const PhraseInput: React.FC<PhraseInputProps> = ({ index, content, onChangeHandler, newWallet }) => {
  return (
    <View style={[styles.phraseInputContainer, newWallet && styles.newWallet]}>
      <Text style={styles.phraseInputText}>{`${index + 1}.`}</Text>
      <TextInput
        style={styles.phraseInput}
        value={content}
        onChangeText={onChangeHandler}
        placeholder="phrase"
        editable={!newWallet}
        placeholderTextColor="grey"
      />
    </View>
  );
};

// Define types for MenomnicPhraseInput component props
interface MenomnicPhraseInputProps {
  seedPhrase: string;
  newWallet: boolean;
}

const MenomnicPhraseInput: React.FC<MenomnicPhraseInputProps> = ({ seedPhrase, newWallet }) => {
  const [words, setWords] = useState<string[]>(Array(12).fill(""));
  const [network, setNetwork] = useState<string>("Ethereum");
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const router = useRouter();
  const { setBlockChain, setSeedPhrase } = useOnboardStore();

  // Handle clipboard copy
  const handleCopy = () => {
    Clipboard.setString(seedPhrase);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1500);
  };

  // Populate words if a new wallet is being created
  useEffect(() => {
    if (newWallet && seedPhrase) {
      const seedWords = seedPhrase.split(" ").slice(0, 12);
      setWords(seedWords);
    }
  }, [newWallet, seedPhrase]);

  // Handle word changes
  const onChange = (text: string, index: number) => {
    setWords((prevWords) => {
      const newWords = [...prevWords];
      newWords[index] = text;
      return newWords;
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mnemonic Phrase</Text>
      <View style={styles.hero}>
        <ScrollView>
          <View style={styles.phraseInputWrapper}>
            {words.map((word, index) => (
              <PhraseInput
                key={index}
                index={index}
                content={word}
                onChangeHandler={(text) => onChange(text, index)}
                newWallet={newWallet}
              />
            ))}
          </View>
        </ScrollView>

        {/* Copy Seed Phrase Button */}
        <View style={styles.copyButtonContainer}>
          <Button
            text={isCopied ? "Copied!" : "Copy seed phrase"}
            onClick={handleCopy}
            style={styles.copyButton}
            disabled={isCopied}
          />
        </View>

        {/* Network Dropdown */}
        <Dropdown
          label={network}
          options={Object.entries(NetworkName).map(([key, value]) => ({
            label: value,
            value: key,
          }))}
          onSelect={(value: string) => setNetwork(value)}
        />

        {/* Instructions */}
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsText}>
            {newWallet
              ? "Please store this mnemonic phrase secretly. Forgetting the phrase can't revive your wallet."
              : "Please enter your secret mnemonic phrase."}
          </Text>

          {/* Continue Button */}
          <Pressable
            style={[styles.continueButton, BUTTON_STYLES.secondary]}
            onPress={() => {
              setBlockChain(network);
              setSeedPhrase(seedPhrase);
              router.replace("/(unprotected)/setPassword");
            }}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: COLORS.white,
  },
  hero: {
    flex: 1,
    justifyContent: "flex-start"
  },
  title: {
    ...FONT_STYLES.bold,
    fontSize: 24,
    marginBottom: 20,
  },
  phraseInputWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  phraseInputContainer: {
    width: Platform.OS === "web" ? "33%" : "46%",
    marginTop: 20,
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
    alignItems: "center",
  },
  newWallet: {
    backgroundColor: "#C2CCCF",
  },
  phraseInputText: {
    marginRight: 5,
    fontWeight: "bold",
    color: "black",
  },
  phraseInput: {
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    padding: 5,
    fontSize: 16,
    color: "black",
    minHeight: 40,
  },
  copyButtonContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  copyButton: {
    padding: 10,
  },
  instructionsContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  instructionsText: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 10,
  },
  continueButton: {
    width: BUTTON_STYLES.medium.width,
    height: BUTTON_STYLES.medium.height,
    padding: BUTTON_STYLES.medium.padding,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  buttonText: {
    ...FONT_STYLES.bold,
    color: COLORS.white,
  },
});

export default MenomnicPhraseInput;
