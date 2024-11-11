import { id } from "ethers";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type solanaAccount = {
    id: number;
    accountName: string;
    publicKey?: string;
    privateKey?: string;
}

export const useSolanaStore = create()(
    persist(
      (set, get) => ({
        id: 0,
        ethAccounts: [],
        addAccount: (account) => {
          let currId = get().id;
          const currentAccounts = get().accounts;
          set({
            id : currId + 1,
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
  