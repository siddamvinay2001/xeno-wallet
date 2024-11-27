import 'react-native-get-random-values';
import '@ethersproject/shims';
import { ethers } from 'ethers';
import { getWalletFromMnemonicEthers } from './ethers';

export function generateMnemonic() {
    try {
        const mnemonic = ethers.Wallet.createRandom().mnemonic;
        return mnemonic ? mnemonic : undefined;
    } catch (err) {
        console.log("Some error while fetching mnemonic: ", err);
        return undefined;
    }
}

export const getWalletFromMnemonic = (mnemonic: string , accountNumber = 0, blockChain="ETH") => {
    try {
        if(blockChain === "ETH"){
            return getWalletFromMnemonicEthers(mnemonic, accountNumber);
        }
        else if(blockChain === "SOL"){

        }
        else if(blockChain === "BTC"){
            
        }
    } catch (err) {
        console.error("Error deriving wallet from mnemonic:", err);
        throw err;
    }
}