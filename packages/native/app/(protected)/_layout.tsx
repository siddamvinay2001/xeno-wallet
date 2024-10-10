import { useSession } from "@/hooks/useSession";
import { Redirect, Stack } from "expo-router";
import { View , Text} from "react-native";

export default function Layout(){
    const {session,storedPassword} = useSession();
    if(!session && (storedPassword ===null || storedPassword === undefined)){
        return <Redirect href={'/Welcome'} />
    }
    else if(!session && storedPassword){
        return<Redirect href={'/LockScreen'} /> 
    }
    return(
        <View>
            <Text> hsnfknsdlncldsk {session}</Text>
            <Stack/>
        </View>
        
    )
}