import { View, StyleSheet, Dimensions, KeyboardAvoidingView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Redirect, useLocalSearchParams } from 'expo-router';
import CustomInput from '@/app/components/CustomInput';
import { useStorageState } from '@/hooks/useStorageState';
// import { setMnemonic } from '@/api/seed';

const Page = () => {
    const { id } = useLocalSearchParams();
    console.log(typeof(id) , " value ",id);

    if(id != "0" && id != "1" ) return <Redirect href={'/'}/>
    
    const [[isLoading, userAccount], setUserAccount] = useStorageState<string>(process.env.USER_DETAILS || 'next-user-details');
    const [input, setInput] = useState <Array> (Array(12).fill(''));
    useEffect(() => {
        // setMnemonic(id=='0',userAccount,setUserAccount);
    }, [id]);

    return (
        <KeyboardAvoidingView style={{flex: 1}} behavior='padding' keyboardVerticalOffset={80}>
            <View style={styles.container}>
                <View style={styles.grid}>
                </View>
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
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
});

export default Page;
