import Colors from '@/constants/Colors';
import { upperCaseString } from '@/src/util/productsUtil';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CategoryPicker from './CategoryPicker';

interface FiltersBarProps {
  categories: string[];
  selectedCategory: string[];
  setSelectedCategory: (category: string) => void;
};

export default function FiltersBar({categories, selectedCategory, setSelectedCategory}:FiltersBarProps) {
    return (
        <View style={styles.filtersBarContainer}>
            <View style={styles.buttonContainer}>
                <CategoryPicker selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} categories={categories} />
            </View>
            
            <View style={styles.filtersContainer}>
                {selectedCategory.map((category) => (
                    <TouchableOpacity key={category} style={styles.selectedFilter} onPress={() => {setSelectedCategory(category)}}>
                        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.selectedFilterText}>{upperCaseString(category)}</Text>
                        <EvilIcons name="close" size={16} color={Colors.blackText} />
                    </TouchableOpacity>
                ))  
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    filtersBarContainer: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 10,
        backgroundColor: Colors.lightGrey,
        alignItems: "center",
    },
    selectedFilter: {
        backgroundColor: Colors.filterBackground,
        padding: 6,
        alignItems: "center",
        margin: 2,
        borderRadius: 4,
        flexDirection: "row",
        gap: 2,
        maxWidth: 110
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    filtersContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start'
    },
    selectedFilterText: {
        maxWidth: 80
    }
})