import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { registerForPushNotificationsAsync } from "../util/registerForPushNotificationsAsync";

interface NotificationContextType {
    expoPushToken: string | null;
    notification: Notifications.Notification | null;
    error: Error | null
}

const NotificationContext = createContext<NotificationContextType | undefined>(
    undefined
);

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (context === undefined){
        throw new Error("useNotification must be used within a NotificationProvider")
    }
    return context;
};

interface NotificationProviderProps {
    children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
    children,
}) => {
    const [expoPushToken, setExpoPushToken] = useState<string|null>(null);
    const [notification, setNotification] = useState<Notifications.Notification | null>(null);
    const [error, setError] = useState<Error|null>(null);

    const router = useRouter();

    function redirect(notification: Notifications.Notification) {
        const url = notification.request.content.data?.url;
        if (url) {
            router.push(url as any);
        }
    }

    useEffect(() => {
    registerForPushNotificationsAsync()
        .then((token:string) => setExpoPushToken(token))
        .catch((error:Error) => setError(error));
    
        const notificationListener = Notifications.addNotificationReceivedListener(notification => {
            console.log("Notification received while the app is running: ", notification);
            setNotification(notification);
        });

        const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
            console.log("User interacted with notification: ",
                JSON.stringify(response, null, 2),
                JSON.stringify(response.notification.request.content.data, null, 2)
            );
            if (response.notification.request.content.data?.url){
                redirect(response.notification);
            }
        });

        return () => {
            notificationListener.remove();
            responseListener.remove();
        };
    }, []);

    return(
        <NotificationContext.Provider value={{ expoPushToken, notification, error}}>
            {children}
        </NotificationContext.Provider>
    );
}