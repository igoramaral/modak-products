import Colors from '@/constants/Colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    pageLayout:{
        flex: 1,
    },
    container: {
        padding: 10,
        borderRadius: 4,
        elevation: 2,
        flex: 1,
        backgroundColor: Colors.lightGrey
    },
    backButton: {
        flexDirection: "row",
        paddingVertical: 10,
        paddingRight: 20,
        paddingLeft: 10,
        alignItems: "center",
        gap: 5
    },
    backButtonText: {
        fontSize: 14,
        color: Colors.greyText
    },
    productTitle: {
        fontWeight: "600",
        fontSize: 26,
        padding: 10,
        marginHorizontal: 8,
        marginBottom: 10,
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
    },
    buttonContainer:{
        alignItems: 'center',
        flexDirection: 'row'
    },
    addToCartButton:{
        alignSelf: "center",
        flexDirection: "row",
        gap: 5,
        flex: 1,
        backgroundColor: Colors.strongGreen,
        padding: 10,
        borderRadius: 30,
        marginVertical: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    addToCartButtonText:{
        fontSize: 18,
        color: Colors.lightGrey,
        fontWeight: '500'
    },
    remindButton:{
        alignSelf: "center",
        flexDirection: "row",
        gap: 5,
        borderColor: Colors.strongGreen,
        borderWidth: 2,
        marginLeft: 10,
        padding: 10,
        borderRadius: 30,
        marginVertical: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    remindButtonText:{
        fontSize: 18,
        color: Colors.strongGreen,
        fontWeight: '500'
    }
})

export default styles;