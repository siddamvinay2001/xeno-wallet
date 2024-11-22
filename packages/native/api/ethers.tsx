import 'react-native-get-random-values';
import '@ethersproject/shims';
import { ethers } from 'ethers';

export const defaultPath = "m/44'/60'/0'/0/";
export const getWalletFromMnemonicEthers = (mnemonicPhrase:string , accountNumber = 0) => {
    try{
        const wallet = ethers.HDNodeWallet.fromPhrase(mnemonicPhrase,defaultPath+accountNumber);
        return wallet;
    }catch(err){
        console.log("Error while getting keys from ethereum", err);
    }
}