import { View, StyleSheet } from "react-native"

export default function CameraBorder () {
    return (
        <>
            <View style={styles.camBorderTL} />
            <View style={styles.camBorderTR} />
            <View style={styles.camBorderBL} />
            <View style={styles.camBorderBR} /> 
        </>
    )
}

const styles = StyleSheet.create({
    camBorderTL: {
        position: 'absolute',
        top: '30%',
        left: '15%',
        width: 40,
        height: 40,
        borderTopWidth: 3,
        borderLeftWidth: 3,
        borderColor: "#fff",
        zIndex: 2
    },

    camBorderTR: {
        position: 'absolute',
        top: '30%',
        right: '15%',
        width: 40,
        height: 40,
        borderTopWidth: 3,
        borderRightWidth: 3,
        borderColor: "#fff",
        zIndex: 2
    },

    camBorderBL: {
        position: 'absolute',
        bottom: '30%',
        left: '15%',
        width: 40,
        height: 40,
        borderBottomWidth: 3,
        borderLeftWidth: 3,
        borderColor: "#fff",
        zIndex: 2
    },

    camBorderBR: {
        position: 'absolute',
        bottom: '30%',
        right: '15%',
        width: 40,
        height: 40,
        borderBottomWidth: 3,
        borderRightWidth: 3,
        borderColor: "#fff",
        zIndex: 2
    },
})
