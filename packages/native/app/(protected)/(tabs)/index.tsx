import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useUserStore } from '@/store/UserStore'
import { getWalletFromMnemonic } from '@/api/wallet';

const index = () => {
  const { accounts, reset } = useUserStore();
  console.log("Accounts : ", accounts);
  useEffect(() => {
    const wallet = getWalletFromMnemonic(accounts[0].mnemonicPhrase);
    console.log("publicKey : ", wallet.publicKey);
    console.log("priveKey", wallet?.privateKey);
    console.log("Address", wallet?.address)

  }, [])
  return (
    <View>
      <Text>index</Text>
    </View>
  )
}

export default index