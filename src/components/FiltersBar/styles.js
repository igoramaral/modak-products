import Colors from '@/constants/Colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    filtersBarContainer: {
        flexDirection: 'row',
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
        justifyContent: "center",
        marginLeft: 2,
        borderRadius: 4,
        flexDirection: "row",
        gap: 2
    }
})

export default styles;