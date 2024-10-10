import { create } from "zustand";
import * as SecureStore from "expo-secure-store";

const userDetailStore = create((set) => ({
  user: {
    lockPassword: null,
    secretPhrase: null,
    accounts: [],
  },

  setUser: async (userData) => {
    set({ user: userData });
    await SecureStore.setItemAsync('userDetails', JSON.stringify(userData)); // Store the complete user object
  },

  // Load user data from secure storage
  loadData: async () => {
    const storedUserDetails = await SecureStore.getItemAsync('userDetails');
    set({
      user: storedUserDetails ? JSON.parse(storedUserDetails) : { lockPassword: null, secretPhrase: null, accounts: [] },
    });
  },

  // Clear all user data
  deleteAll: async () => {
    await SecureStore.deleteItemAsync('userDetails');
    set({ user: { lockPassword: null, secretPhrase: null, accounts: [] } });
  },
}));

export default userDetailStore;
