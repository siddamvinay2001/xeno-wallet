import { View, Text } from 'react-native'
import React from 'react'
import { useUserStore } from '@/store/UserStore'

const index = () => {
  const {accounts, password, seedPhrase} = useUserStore();
  console.log(seedPhrase)
  return (
    <View>
      <Text>index</Text>
    </View>
  )
}

export default index