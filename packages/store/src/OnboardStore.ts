import { create } from "zustand";

type OnboardStore = {
    newWallet: boolean;
    privKey: string | null;
    seedPhrase: string | null;
    blockChain: string;
    setSeedPhrase: (phrase: string) => void;
    setBlockChain: (blockChain: string) => void;
}

export const useOnboardStore = create<OnboardStore>((set)=>({
    newWallet: true,
    privKey: null,
    seedPhrase: null,
    blockChain: 'ETH',
    setSeedPhrase: (phrase: string) => {
        set({
            seedPhrase: phrase,
        });
    },
    setBlockChain: (blockChain: string) => {
        set({
            blockChain: blockChain,
        });
    },
}))