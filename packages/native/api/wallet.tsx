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

export const deriveEtherFromMnemonic = (phrase, accountNumber = 0) => {
    try {
        if (!ethers.Mnemonic.isValidMnemonic(phrase)) {
            throw new Error("Invalid mnemonic phrase");
        }        
        const wallet = ethers.HDNodeWallet.fromPhrase(phrase,);
        console.log("Wallet : ", wallet);
        return wallet;
    } catch (err) {
        console.error("Error deriving wallet from mnemonic:", err);
        throw err;
    }
};
export const getWalletFromMnemonic = (mnemonic , accountNumber = 0, blockChain="ETH") => {
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