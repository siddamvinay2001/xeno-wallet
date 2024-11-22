import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Define the Account type (adjust if needed)
type Account = {
  id: number;
  accountName: string;
  mnemonicPhrase?: string | null; 
  privateKey?: string;
  blockChains?: string[];
};

// Define the Store's state type
type UserStore = {
  id: number;
  password: string | null;
  accounts: Account[];
  network: string;
  setNetwork: (network: string) => void;
  addAccount: (account: Account) => void;
  removeAccount: (id: number) => void;
  setPassword: (password: string | null) => void;
  reset: () => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      id: 0,
      accounts: [],
      password: null,
      network: "mainnet",
      setNetwork: (network: string) => {
        set({ network });
      },
      addAccount: (account: Account) => { // Added type for account parameter
        const currentAccounts = get().accounts;
        let currentId = get().id;
        set({
          id: currentId + 1,
          accounts: [...currentAccounts, account], // Spread the existing accounts and add the new one
        });
      },
      removeAccount: (id: number) => {
        const currentAccounts = get().accounts;
        const updatedAccounts = currentAccounts.filter(
          (account) => account.id !== id
        );
        set({
          accounts: updatedAccounts,
        });
      },
      setPassword: (password: string | null) => {
        set({ password });
      },
      reset: () => {
        set({
          id: 0,
          accounts: [],
          password: null,
        });
      },
    }),
    {
      name: "account-storage", // The key used for storing in localStorage
      storage: createJSONStorage(() => localStorage), // Optional: using localStorage or any other storage
    }
  )
);
