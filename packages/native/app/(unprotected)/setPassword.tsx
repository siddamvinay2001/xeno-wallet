import { View, Text, Pressable } from 'react-native'
import React, { useContext } from 'react'
import { useUserStore } from '@/store/UserStore';
import { useRouter } from 'expo-router';

const index = () => {
  console.log("index");
  const {accounts, password, setPassword} = useUserStore();
  console.log("Accounts : ", accounts);
  const router = useRouter();
  return (
    <View>
      <Text>index</Text>
      <Pressable onPress={() => {
        setPassword("google");
        router.replace("/");
      }}><Text>click me</Text></Pressable>
    </View>
  )
}

export default index