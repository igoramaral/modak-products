import Colors from "@/constants/Colors";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native";
import ImageCarousel from "../../components/ImageCarousel";
import ProductPrice from "../../components/ProductDisplay/ProductPrice";
import ProductRating from "../../components/ProductDisplay/ProductRating";
import ReviewDisplay from "../../components/ReviewDisplay";
import { useProduct } from "../../hooks/useProduct";
import styles from "./productStyles";

export default function Product() {
    const { id } = useLocalSearchParams();

    const router = useRouter();

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

    return(
        <ScrollView style={styles.pageLayout}>
            <View style={styles.container}>
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

                {/*Uncoment to enable Add Reminder button. addProductReminder isn't working.*/}
                {/* <Button 
                    icon="calendar" 
                    mode="outlined"
                    buttonColor={Colors.strongGreen}
                    onPress={()=>{
                        addProductReminder(product.title, new Date(), new Date(Date.now() + 60*60*1000))
                        .catch((err)=>{
                            Alert.alert("Error", err.message);
                        })
                    }}
                > 
                    Add Reminder
                </Button> */}

                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionTitle}>Description</Text>
                    <Text style={styles.descriptionText}>{product.description}</Text>
                </View>

                <ReviewDisplay reviews={product.reviews}/>
            </View>
        </ScrollView>
    )
}