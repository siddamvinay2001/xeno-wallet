import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useUserStore } from '@xeno/store'
import { getWalletFromMnemonic } from '@/api/wallet';

const index = () => {
  const { accounts, reset } = useUserStore();
  console.log("Accounts : ", accounts);
  useEffect(() => {
  

  }, [])
  return (
    <View>
      <Text>index</Text>
    </View>
  )
}

export default index