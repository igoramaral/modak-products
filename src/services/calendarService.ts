import { NativeModules, PermissionsAndroid, Platform } from "react-native";

const { CalendarModule } = NativeModules;

export async function addProductReminder(
    title: string,
    startDate: Date,
    endDate: Date
): Promise<void> {
    if (Platform.OS !== "android") {
        throw new Error("Not supported on this platform yet");
    }

    const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_CALENDAR,
        {
            title: "Permissão para calendário",
            message: "Precisamos adicionar um lembrete no seu calendário",
            buttonPositive: "Permitir",
        }
    );

    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        throw new Error("Calendar permission denied");
    }

    CalendarModule.addEvent(title, startDate.getTime(), endDate.getTime());
}
