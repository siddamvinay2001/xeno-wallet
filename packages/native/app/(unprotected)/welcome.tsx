import { View, Text, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { BUTTON_STYLES, FONT_STYLES, COLORS } from '@/constants/Constants';
import { useRouter } from 'expo-router';
import { useUserStore } from '@/store/UserStore';

const Screen = () => {
  const router = useRouter();
  const {accounts, addAccount} = useUserStore();
  console.log("Accounts : ", accounts)

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Your new next wallet</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, BUTTON_STYLES.primary]}
          onPress={() => { router.push('/(unprotected)/creation/0') }}
        >
          <Text style={styles.buttonText}>Create a new Wallet</Text>
        </Pressable>
        <Pressable
          style={[styles.button, BUTTON_STYLES.secondary]}
          onPress={() => { router.push('/(unprotected)/creation/1') }}
        >
          <Text style={styles.buttonText}>Import from existing wallet</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  title: {
    ...FONT_STYLES.title, 
  },
  buttonContainer: {
    alignItems: 'center',
    gap: 5,
    flexDirection: 'column',
  },
  button: {
    width: BUTTON_STYLES.medium.width,
    height: BUTTON_STYLES.medium.height,
    padding: BUTTON_STYLES.medium.padding,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.buttonText,
    fontSize: BUTTON_STYLES.medium.fontSize, 
  },
});

export default Screen;
