import * as Notifications from 'expo-notifications';
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { CartProvider } from '../context/cartContext';
import { NotificationProvider } from "../context/notificationContext";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

export default function RootLayout() {
    return (
        <NotificationProvider>
            <CartProvider>
                <PaperProvider>
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
                </PaperProvider>
            </CartProvider>
        </NotificationProvider>
        
    );
}
