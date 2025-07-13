import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{flex: 1}} edges={['top', 'bottom']}>
                <StatusBar style="dark" />
                <Stack
                    screenOptions={{
                        headerShown: false,
                    }}
                />
            </SafeAreaView> 
        </SafeAreaProvider>
    );
}
