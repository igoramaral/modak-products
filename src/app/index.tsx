import { View } from "react-native";
import ProductList from "../components/ProductList";
import TopBar from "../components/TopBar";
import { useNotification } from "../context/notificationContext";

export default function Index() {

    const { expoPushToken } = useNotification();
    console.log(expoPushToken);

    return (
        <View style={{flex: 1}}>
            <TopBar title="Products" />
            <ProductList />
        </View>
        
    )
}
