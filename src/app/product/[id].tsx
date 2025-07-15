import Colors from "@/constants/Colors";
import TopBar from "@/src/components/TopBar";
import { useCart } from "@/src/context/cartContext";
import { Product } from "@/src/types/product";
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as Notifications from "expo-notifications";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator, Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import ImageCarousel from "../../components/ImageCarousel";
import ProductPrice from "../../components/ProductDisplay/ProductPrice";
import ProductRating from "../../components/ProductDisplay/ProductRating";
import ReviewDisplay from "../../components/ReviewDisplay";
import { useProduct } from "../../hooks/useProduct";
import styles from "./productStyles";

export default function ProductPage() {
    const { id } = useLocalSearchParams();
    const { addProduct } = useCart();

    const router = useRouter();

    async function scheduleReminder(product:Product) {

        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Don't forget!",
                body: `Check out ${product.title} again!`,
                data: { url: `/product/${product.id}`}, 
            },
            trigger: {
                type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
                seconds: 20,
                repeats: false,
            }
        });

        console.log('Reminder created for product ' + product.id);
    }

    if (!id) {
        return (
            <View 
            style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text>Invalid Product</Text>
            </View>
        );
    }
    const normalizedId = Array.isArray(id) ? id[0] : id;
    const { product, loading, error } = useProduct(normalizedId);

    if (loading) {
        return (
            <View 
            style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (error || !product) {
        return (
            <View 
            style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text>Error loading Product. Please try again.</Text>
            </View>
        );
    }

    const showReminderSuccessfullAlert = () => {
        Alert.alert(
            "Reminder set",
            `You will be reminded soon to check the product!`,
            [
                {
                text: "Ok",
                onPress: () => scheduleReminder(product),
                },
            ],
            { cancelable: false }
        )
    }

    return(
        <ScrollView style={styles.pageLayout}>
            <View style={styles.container}>
                <TopBar title="Product" />
                <TouchableOpacity style={styles.backButton} onPress={router.back}>
                    <Ionicons name="arrow-back-outline" size={30} color={Colors.strongGreen} />
                    <Text style={styles.backButtonText}>Return to Products List</Text>
                </TouchableOpacity>

                <Text style={styles.productTitle}>{product?.title}</Text>

                <ImageCarousel images={product.images}/>

                <View style={styles.ratingBrandRow}>
                    <ProductRating rating={product.rating} />
                    {product.brand && <Text style={styles.brandText}>Brand: {product.brand}</Text>}
                </View>

                <View style={styles.priceRow}>
                    <ProductPrice value={product.price} smallerFontSize={20} biggerFontSize={34}/>
                    { Math.floor(product.discountPercentage) > 0 && 
                        <View>
                            <Text style={styles.discountText}>({Math.floor(product.discountPercentage)}% OFF)</Text>
                        </View>
                    }
                </View>

                <View style={styles.priceRow}>
                    
                    <Text 
                        style={ product.availabilityStatus === 'In Stock' ? styles.inStockText : styles.lowStockText}
                    >
                        {product.availabilityStatus}
                    </Text>
                    {product.stock > 0 && <Text style={styles.stockLeftText}>({product.stock} Left)</Text>}
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.addToCartButton} onPress={()=>{addProduct(product, 1)}}>
                        <Ionicons name="cart" size={24} color={Colors.lightGrey} />
                        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.remindButton} onPress={showReminderSuccessfullAlert}>
                        <MaterialIcons name="notification-add" size={24} color={Colors.strongGreen} />
                        <Text style={styles.remindButtonText}>Reminder</Text>
                    </TouchableOpacity>    
                </View>
                                

                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionTitle}>Description</Text>
                    <Text style={styles.descriptionText}>{product.description}</Text>
                </View>

                <ReviewDisplay reviews={product.reviews}/>
            </View>
        </ScrollView>
    )
}
