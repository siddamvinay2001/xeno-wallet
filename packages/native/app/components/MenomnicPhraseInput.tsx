import { View, Text, TextInput, Platform, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { BUTTON_STYLES, FONT_STYLES, COLORS } from '@/constants/Constants';
import { deriveEtherFromMnemonic } from '@/api/wallet';

let test_phrase = "script answer will moon recipe pyramid other cabbage human visa grab whip"

export const PhraseInput = ({ index, newWallet, content, onChangeHandler }) => {
    return (
        <View style={{
            width: Platform.OS === "web" ? "33%" : "46%",
            marginTop: 20,
            flexDirection: 'row',
            backgroundColor: newWallet ? "#C2CCCF" : "white",
            borderRadius: 8,
            shadowColor: 'gray',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 5,
            paddingVertical: 5,
            paddingHorizontal: 5,
            alignItems: 'center',
        }}>
            <Text style={{
                marginRight: 5,
                fontWeight: 'bold',
                color: 'black',
            }}>
                {`${index + 1}.`}
            </Text>
            <TextInput
                style={{
                    flex: 1,
                    borderBottomWidth: 1,
                    borderBottomColor: 'grey',
                    padding: 5,
                    fontSize: 16,
                    color: 'black',
                    minHeight: 40,
                }}
                value={content}
                onChangeText={onChangeHandler}
                placeholder='phrase'
                editable={!newWallet}
                placeholderTextColor='grey'
            />
        </View>
    );
};

const MenomnicPhraseInput = ({ seedPhrase, newWallet }) => {
    const [words, setWords] = useState(Array(12).fill(""));

    useEffect(() => {
        if (newWallet && seedPhrase) {
            const seedWords = seedPhrase.split(' ').slice(0, 12);
            setWords(seedWords);
        }
    }, [newWallet, seedPhrase]);

    const onChange = (text, index) => {
        setWords(prevWords => {
            const newWords = [...prevWords]; // Create a new array
            newWords[index] = text; // Update the specific word
            return newWords; // Return the new array
        });
    };

    return (
        <View style={{ flex: 1 }}>
            <Text>Mnemonic Phrase</Text>
            <ScrollView>
                <View style={{ flex: 1, justifyContent: "space-between", flexDirection: "row", flexWrap: "wrap" }}>
                    {words.map((word, index) => {
                        return (
                            <PhraseInput
                                key={index}
                                index={index}
                                newWallet={newWallet}
                                content={word}
                                onChangeHandler={(text) => onChange(text, index)}
                            />
                        );
                    })}
                </View>
            </ScrollView>
            <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
                <Text>
                    {newWallet ? "Please store this mnemonic phrase secretly forgetting the phrase cant revive your wallet" : "Please enter your secret mneominc phrase"}
                </Text>
                <Pressable style={[{
                    width: BUTTON_STYLES.medium.width,
                    height: BUTTON_STYLES.medium.height,
                    padding: BUTTON_STYLES.medium.padding,
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 5
                }, BUTTON_STYLES.secondary]}
                onPress={()=>{
                    deriveEtherFromMnemonic(test_phrase, 0)
                }}
                ><Text>Continue</Text></Pressable>
            </View>
        </View>
    );
};

export default MenomnicPhraseInput;
