import { View, Text, StyleSheet, Dimensions, KeyboardAvoidingView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Redirect, useLocalSearchParams } from 'expo-router';
import CustomInput from '@/app/components/CustomInput';
import { useStorageState } from '@/hooks/useStorageState';
import WalletCreation from '@/app/components/WalletCreation';

const Page = () => {
    const { id } = useLocalSearchParams();
    if (id != "0" && id != "1") return <Redirect href={'/'} />

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' keyboardVerticalOffset={80}>
            <View style={styles.container}>
                <WalletCreation/>
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
