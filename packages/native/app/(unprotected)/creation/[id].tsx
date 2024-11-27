// src/native/MnemonicInputFormNative.tsx
import React, { useEffect, useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView } from "react-native";
import Clipboard from "@react-native-clipboard/clipboard";
import { Redirect, useLocalSearchParams, useRouter } from "expo-router";
import { generateMnemonic } from "@/api/wallet";
import { MnemonicInputForm } from "@xeno/ui";
import { useOnboardStore } from "@xeno/store";

const Page = () => {
    const { id } = useLocalSearchParams();
    const [seedPhrase, setSeedPhrase] = useState<string>("");
    const [network, setNetwork] = useState<string>("ETH");
    const [isCopied, setIsCopied] = useState<boolean>(false);
    const { setBlockChain, setSeedPhrase: setOnboardSeedPhrase } = useOnboardStore();
    const router = useRouter();
    if (id !== "0" && id !== "1") return <Redirect href="/" />;

    useEffect(() => {
        const fetchMnemonic = async () => {
            if (id === "0") {
                const phrase = await generateMnemonic();
                setSeedPhrase(phrase?.phrase || "");
            }
        };
        fetchMnemonic();
    }, [id]);

    const handleChange = (text: string, index: number) => {
        setSeedPhrase((prevPhrase) => {
            const words = prevPhrase.split(" ");
            words[index] = text;
            return words.join(" ");
        });
    };

    const handleCopy = () => {
        Clipboard.setString(seedPhrase);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 1500);
    };

    const handleContinue = () => {
        setBlockChain(network);
        setOnboardSeedPhrase(seedPhrase);
        router.replace("/setPassword");
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={80}>
            <View style={styles.container}>
                <MnemonicInputForm
                    seedPhrase={seedPhrase}
                    newWallet={id === "0"}
                    onChange={handleChange}
                    network={network}
                    setNetwork={setNetwork}
                    onCopy={handleCopy}
                    isCopied={isCopied}
                    onContinue={handleContinue}
                />
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff",
    },
});

export default Page;
