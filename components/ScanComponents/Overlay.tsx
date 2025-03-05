import { View } from "react-native";
import { StyleSheet } from "react-native";

export default function Overlay () {
    return (
        <View style={styles.overlay}>
            <View style={styles.maskTop} />

            <View style={styles.maskMiddle}>
            <View style={styles.maskSide} />
                <View style={styles.hole} />
                <View style={styles.maskSide} />
            </View>
            
            <View style={styles.maskBottom} />
        </View>
    )
}

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        backgroundColor: 'transparent',
        width: '100%',
        height: '100%',
        zIndex: 1,
    },

    maskTop: {
        width: '100%',
        height: '35%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },

    maskMiddle: {
        flexDirection: 'row',
        width: '100%',
        height: '30%', 
    },
    
    maskSide: {
        width: '20%', 
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    
    hole: {
        flex: 1, 
        borderRadius: 20
    },
    
    maskBottom: {
        width: '100%',
        height: '35%', 
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
});
