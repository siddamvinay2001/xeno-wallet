import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { useUserStore } from '@/store/UserStore';

const index = () => {
  console.log("index");
  const {accounts} = useUserStore();
  console.log("Accounts : ", accounts);
  return (
    <View>
      <Text>index</Text>
    </View>
  )
}

export default index