import Colors from "@/constants/Colors";
import React, { useState } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

interface ImageCarouselProps {
    images: string[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
    const width = Dimensions.get("window").width;
    const [currentIndex, setCurrentIndex] = useState(0);

    const canScroll = images.length > 1;

    return (
        <View>
            <Carousel
                loop={canScroll}
                autoPlay={false}
                enabled={canScroll}
                width={width}
                height={width * 0.75}
                data={images}
                scrollAnimationDuration={500}
                onSnapToItem={(index) => setCurrentIndex(index)}
                renderItem={({ item }) => (
                    <Image source={{ uri: item }} style={styles.image} />
                )}
            />

            {canScroll &&
                <View style={styles.paginationContainer}>
                    {images.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.indexDot,
                                currentIndex === index && styles.currentDot,
                            ]}
                        />
                    ))}
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        borderRadius: 8,
    },
    paginationContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
    },
    indexDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#ccc",
        marginHorizontal: 4,
    },
    currentDot: {
        backgroundColor: Colors.strongGreen,
    },
});
