import Colors from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from 'react-native-paper';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) {
    const prevDisabled = currentPage <= 1;
    const nextDisabled = currentPage >= totalPages;

    return (
        <View style={styles.container}>
            <Button
                icon="arrow-left-drop-circle-outline"
                onPress={() => onPageChange(currentPage - 1)}
                disabled={prevDisabled}
                mode="outlined"
                textColor={Colors.strongGreen}
            >
                Previous
            </Button>
            <Text style={styles.pageText}>
                Page {currentPage} of {totalPages}
            </Text>
            <Button
                icon="arrow-right-drop-circle-outline"
                onPress={() => onPageChange(currentPage + 1)}
                disabled={nextDisabled}
                mode="outlined"
                contentStyle={{flexDirection: "row-reverse"}}
                textColor={Colors.strongGreen}
            >
                Next
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 8,
        gap: 8,
    },
    pageText: {
        fontSize: 16,
        fontWeight: "500",
    },
});
