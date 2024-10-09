import { useSession } from "@/hooks/useSession";
import { Stack } from "expo-router";
import { View , Text} from "react-native";

export default function Layout(){
    const {session} = useSession();
    console.log("Curr Session", session);
    return(
        <View>
            <Text> hsnfknsdlncldsk {session}</Text>
            <Stack/>
        </View>
        
    )
}