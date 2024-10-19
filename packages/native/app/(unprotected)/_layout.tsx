import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const Layout = () => {
  return (
    <Stack>
        <Stack.Screen name='welcome' options={{headerShown: false}} />
        <Stack.Screen name='lockScreen' options={{headerShown: false}}/>
        <Stack.Screen name='creation/[id]' options={{headerShown: true, title:"Wallet Creation"}}/>
    </Stack>
  )
}

export default Layout