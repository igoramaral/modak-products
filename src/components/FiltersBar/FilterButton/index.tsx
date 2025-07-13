import Colors from '@/constants/Colors';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

interface FilterButtonProps {
    selectedCategory: string | null;
    setSelectedCategory: (category: string | null) => void;
}

export default function FilterButton({selectedCategory, setSelectedCategory}:FilterButtonProps) {

    const clearFilters = (selectedCategory:string|null) => {
        if(selectedCategory){
            setSelectedCategory(null);
        }
    }

    const filterSelected = (selectedCategory:string|null):Boolean => {
        if (selectedCategory){
            return true;
        }

        return false;
    }

    return (

        <View>
            {filterSelected(selectedCategory) ?
                <TouchableOpacity onPress={()=>{clearFilters(selectedCategory)}}>
                    <FontAwesome6 name="filter-circle-xmark" size={26} color={Colors.strongGreen} />
                </TouchableOpacity> :
                <View>
                    <FontAwesome6 name="filter" size={26} color={Colors.strongGreen} />
                </View>
            }
        </View>

    );
}