import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type Account = {
  id: number;
  accountName: string;
  mnemonicPhrase?: string | null; 
  privateKey?: string;
  blockChains?: string[];
};

type UserStore = {
  id: number;
  password: string;
  accounts: Account[];
  network: string;
  setNetwork: (network: string) => void;
  addAccount: (account: Account) => void;
  removeAccount: (id: number) => void;
  setPassword: (password: string) => void;
  reset: () => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      id: 0,
      accounts: [],
      password: "",
      network: "mainnet",
      setNetwork: (network: string) => {
        set({ network });
      },
      addAccount: (account: Account) => { 
        const currentAccounts = get().accounts;
        let currentId = get().id;
        set({
          id: currentId + 1,
          accounts: [...currentAccounts, account], 
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
      setPassword: (password: string ) => {
        set({ password });
      },
      reset: () => {
        set({
          id: 0,
          accounts: [],
          password: "",
        });
      },
    }),
    {
      name: "account-storage", 
      storage: createJSONStorage(() => localStorage), 
    }
  )
);
