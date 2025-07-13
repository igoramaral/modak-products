import Colors from '@/constants/Colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    pageLayout:{
        padding: 10,
        flex: 1,
        marginVertical: 10
    },
    container: {
        padding: 10,
        borderRadius: 4,
        elevation: 2,
        flex: 1,
        backgroundColor: Colors.lightGrey
    },
    productTitle: {
        fontWeight: "600",
        fontSize: 26,
        padding: 10,
        marginHorizontal: 8,
        marginVertical: 10,
        color: Colors.blackText
    },
    ratingBrandRow: {
        margin: 10,
        paddingHorizontal: 10,
        flexDirection: "row",
        justifyContent: "space-between" 
    },
    brandText: {
        color: Colors.blackText,
        fontWeight: "500"
    },
    priceRow : {
        marginHorizontal: 10,
        paddingHorizontal: 10,
        flexDirection: "row",
        gap: 10,
        alignItems: "center"
    },
    discountText: {
        color: Colors.discountColor,
        fontSize: 18
    },
    inStockText: {
        color: Colors.greenText,
        fontSize: 22,
        fontWeight: '500'
    },
    lowStockText: {
        color: Colors.discountColor,
        fontSize: 22,
        fontWeight: '500'
    },
    stockLeftText: {
        color: Colors.greyText,
        fontSize: 16
    },
    descriptionContainer: {
        margin: 10,
        paddingHorizontal: 10,
    },
    descriptionTitle: {
        color: Colors.strongGreen,
        fontSize: 20,
        fontWeight: '500',
        marginBottom: 10
    },
    descriptionText: {
        fontSize: 16,
        color: Colors.greyText
    }
})

export default styles;