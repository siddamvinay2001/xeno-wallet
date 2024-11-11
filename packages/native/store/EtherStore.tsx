import { id } from "ethers";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type etherAccount = {
    id: number;
    accountName: string;
    publicKey?: string;
    privateKey?: string;
}

export const useEtherStore = create()(
    persist(
      (set, get) => ({
        id: 0,
        ethAccounts: [],
        addAccount: (account) => {
          const currentAccounts = get().accounts;
          let currId = get().id;
          set({
            accounts: [...currentAccounts, account], // Spread the existing accounts and add the new one
            id: currId + 1
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
  