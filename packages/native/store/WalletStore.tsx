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

type Wallet = {
    id: number;
    accountId: number;
    suffixNumber:  number;
    publicKey?: string;
    privateKey?: string;
}

// Define the Store's state type
type WalletStore = {
    id: number;
  type: string;
  path: string;
  wallets: Wallet[];
  addWallet: (wallet: Wallet) => void;
  deleteWallet: (id: number) => void;
};

export const useWalletStore = create<WalletStore>()(
  persist(
    (set, get) => ({
        id:0,
        type: '',
        path: '',
        wallets: [],
        addWallet: (wallet) => {
          set({
            wallets: [...get().wallets, wallet],
            id: get().id + 1
          });
        },
        deleteWallet: (id) => {
          set({
            wallets: get().wallets.filter((wallet) => wallet.id !== id),
          });
        },
    {
      name: 'account-storage', // The key used for storing in localStorage
      storage: createJSONStorage(() => localStorage), // Optional: using localStorage or any other storage
    }
  )
);