import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ProductPriceProps {
    value: number;
    currency?: string;
    locale?: string
}

export default function ProductPrice({ value, currency = "$", locale = 'en-US' }: ProductPriceProps) {
    const [intPart, fracPart] = value.toFixed(2).split(".");

    const intPartFormatted = new Intl.NumberFormat(locale, {
        minimumFractionDigits: 0,
        }).format(parseInt(intPart, 10));

    return (
        <View style={styles.container}>
            <Text style={styles.currency}>{currency}</Text>
            <Text style={styles.integer}>{intPartFormatted}</Text>
            <Text style={styles.fraction}>,{fracPart}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 4,
        flexDirection: "row",
        alignItems: "flex-start",
    },
    currency: {
        fontSize: 14,
        fontWeight: "500",
        marginTop: 4,
    },
    integer: {
        fontSize: 26,
        fontWeight: "700",
        marginHorizontal: 2,
    },
    fraction: {
        fontSize: 12,
        fontWeight: "500",
        marginTop: 4,
    },
});
