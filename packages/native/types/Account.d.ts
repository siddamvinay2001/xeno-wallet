type Account = {
    id: string;
    accountName: string;
    mneomnicPhrase?: string;
    privateKey?: string;
    blockChains: Blockchain[];
}