import { View, Text, StyleSheet, Dimensions, KeyboardAvoidingView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Redirect, useLocalSearchParams } from 'expo-router';
import { generateMnemonic } from '@/api/wallet';
import MenomnicPhraseInput from '@/components/MenomnicPhraseInput';
const Page = () => {
    const { id } = useLocalSearchParams();
    const [seedPhrase, setSeedPhrase] = useState<string>("");
    if (id != "0" && id != "1") return <Redirect href={'/'} />

    useEffect(()=>{
        const fetchMnemonic = async()=>{
            if(id === '0'){
                const phrase = await generateMnemonic();
                setSeedPhrase(phrase?.phrase || "");
            };
        }
        fetchMnemonic();
    },[id]) 


    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' keyboardVerticalOffset={80}>
            <View style={styles.container}>
                <MenomnicPhraseInput seedPhrase={seedPhrase} newWallet={id==='0'}/>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffff',
        flex: 1,
        padding: 16,
    },
});

export default Page;
