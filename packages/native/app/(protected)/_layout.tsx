import { useSession } from "@/providers/SessionProvider";
import { useUserStore } from "@/store/UserStore";
import { Redirect, Stack } from "expo-router";
import { useEffect } from "react";
import { View, Text } from "react-native";

export default function Layout() {
    const { login, setLogin } = useSession();
    const { password , reset} = useUserStore();

    if (!login && !password) {
        return <Redirect href={'/(unprotected)/welcome'} />
    }
    else if (!login && password) {
        return <Redirect href={'/(unprotected)/lockScreen'} />
    } return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
    )
}