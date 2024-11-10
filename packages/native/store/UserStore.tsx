import {create} from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Define the Account type (adjust if needed)
type Account = {
  id: string;
  accountName: string;
  mneomnicPhrase?: string;
  privateKey?: string;
  blockChains?: string[];
};

// Define the Store's state type
type UserStore = {
  accounts: Account[];
  addAccount: (account: Account) => void;
  removeAccount: (id: string) => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      accounts: [],
      addAccount: (account) => {
        const currentAccounts = get().accounts;
        set({
          accounts: [...currentAccounts, account], // Spread the existing accounts and add the new one
        });
      },
      removeAccount: (id) => {
        const currentAccounts = get().accounts;
        set({
          accounts: currentAccounts.filter((account) => account.id !== id),
        });
      },
    }),
    {
      name: 'account-storage', // The key used for storing in localStorage
      storage: createJSONStorage(() => localStorage), // Optional: using localStorage or any other storage
    }
  )
);
