import Colors from '@/constants/Colors';
import { upperCaseString } from '@/src/util/productsUtil';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import CategoryPicker from './CategoryPicker';
import FilterButton from './FilterButton';
import styles from './styles';

interface FiltersBarProps {
  categories: string[];
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
};

export default function FiltersBar({categories, selectedCategory, setSelectedCategory}:FiltersBarProps) {
    return (
        <View style={styles.filtersBarContainer}>
            <FilterButton selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

            <CategoryPicker selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} categories={categories} />

            {selectedCategory && 
                <TouchableOpacity style={styles.selectedFilter} onPress={() => {setSelectedCategory(null)}}>
                    <Text>{upperCaseString(selectedCategory)}</Text>
                    <EvilIcons name="close" size={16} color={Colors.blackText} />
                </TouchableOpacity>
            }
        </View>
    );
}