import { useSession } from "@/hooks/useSession";
import { Redirect, Stack } from "expo-router";
import { View , Text} from "react-native";

export default function Layout(){
    const {session,storedPassword} = useSession();
    if(!session && (storedPassword ===null || storedPassword === undefined)){
        return <Redirect href={'/(unprotected)/welcome'} />
    }
    else if(!session && storedPassword){
        return<Redirect href={'/(unprotected)/lockScreen'} /> 
    }
    return(
        <Stack>
            <Stack.Screen name="(tabs)" />
        </Stack>
    )
}