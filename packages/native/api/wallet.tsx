import 'react-native-get-random-values';
import '@ethersproject/shims'
import {ethers} from 'ethers';

export function generateMenompnic(){
    try{
        const phrase = ethers.Wallet.createRandom().mnemonic;
    }catch(err){
        console.log("Some errror while fetching Menomonic: ", err);
    }
}