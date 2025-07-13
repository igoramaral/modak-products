import Colors from "@/constants/Colors";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import SortButtonGroup from "./SortButtonGroup";
import ViewButtonGroup from "./ViewButtonGroup";

interface SortByBarProps {
    sortBy: "price" | "rating" | null;
    setSortBy: (field: "price" | "rating" | null) => void;

    sortDirection: "asc" | "desc";
    setSortDirection: (dir: "asc" | "desc") => void;

    viewMode: "grid" | "list" | null;
    setViewMode: (view: "grid" | "list") => void;
}

export default function DisplayOptionsBar({
    sortBy,
    setSortBy,
    sortDirection,
    setSortDirection,
    viewMode,
    setViewMode
}: SortByBarProps) {
    const [valueSort, setValueSort] = useState<string | null>(null);
    const iconSize = 16;
    const iconColor = Colors.strongGreen;

    const handlePressSort = (value:string) => {
        if(value){
            setValueSort(value);
            const sortOptions = value.split(" ");

            setSortBy(sortOptions[0] === 'price' ? 'price' : 'rating');
            setSortDirection(sortOptions[1] === 'asc' ? 'asc' : 'desc');
        }
    }

    const handlePressView = (value:string) => {
        if(value){
            setViewMode(value === 'grid' ? 'grid' : 'list');
        }
    }

    return (
        <View style={styles.displayOptionsBarContainer}>
            <View style={styles.optionsContainer}>
                <Text>Sort by:</Text>
                <SortButtonGroup handlePress={handlePressSort} value={valueSort} iconSize={iconSize} iconColor={iconColor}/>
            </View>
            
            <View style={styles.optionsContainer}>
                <ViewButtonGroup handlePress={handlePressView} value={viewMode} iconSize={iconSize} iconColor={iconColor} />
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    displayOptionsBarContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 10,
        backgroundColor: Colors.lightGrey,
        alignItems: "center",
        justifyContent: "space-between"
    },
    optionsContainer: {
        flexDirection: 'row',
        alignItems: "center"
    }
})
