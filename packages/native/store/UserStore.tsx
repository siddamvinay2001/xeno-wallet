import {create} from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Define the Account type (adjust if needed)
type Account = {
  id: number;
  accountName: string;
  mneomnicPhrase?: string; 
  privateKey?: string;
  blockChains?: string[];
};

// Define the Store's state type
type UserStore = {
  id: number;
  accounts: Account[];
  password?: string | null;
  loggedIn?: boolean;
  addAccount: (account: Account) => void;
  removeAccount: (id: number) => void;
  setPassword: (password: string) => void;
  authenticate: (login: boolean) => void;
  reset: () => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      id: 0,
      accounts: [],
      password: null,
      loggedIn: false,
      addAccount: (account) => {
        const currentAccounts = get().accounts;
        let currentId = get().id;
        set({
          id: currentId + 1,
          accounts: [...currentAccounts, account], // Spread the existing accounts and add the new one
        });
      },
      removeAccount: (id) => {
        const currentAccounts = get().accounts;
        set({
          accounts: currentAccounts.filter((account) => account.id !== id),
        });
      },

      setPassword: (password) => {
        set({ password });
      },
      authenticate: (login) => {
        set({ loggedIn: login });
      },
      reset: () => {
        set({
          id: 0,
          accounts: [],
          password: null,
          loggedIn: false,
        });
      }
    }),
    {
      name: 'account-storage', // The key used for storing in localStorage
      storage: createJSONStorage(() => localStorage), // Optional: using localStorage or any other storage
    }
  )
);
