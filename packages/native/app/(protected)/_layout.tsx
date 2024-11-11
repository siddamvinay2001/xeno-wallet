import { useUserStore } from "@/store/UserStore";
import { Redirect, Stack } from "expo-router";
import { useEffect } from "react";
import { View , Text} from "react-native";

export default function Layout(){
    const {loggedIn, password, accounts, removeAccount} = useUserStore();
    console.log("loggedIn : ", loggedIn);
    console.log("password : ", password);
    console.log("Accounts : ", accounts);
    if(!loggedIn && !password){
        return <Redirect href={'/(unprotected)/welcome'} />
    }
    else if(!loggedIn && password){
        return<Redirect href={'/(unprotected)/lockScreen'} /> 
    }
    return(
        <Stack>
            <Stack.Screen name="(tabs)" options={{headerShown: false}} />
        </Stack>
    )
}