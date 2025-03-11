import Svg, { Path } from "react-native-svg"
import { StyleSheet } from "react-native";

export default function AlertIcon () {
    return (
        <Svg  
            width="192"  
            height="192"  
            viewBox="0 0 24 24"  
            fill="#ffffff"  
            style={styles.alert}
        >
            <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <Path d="M12 1.67c.955 0 1.845 .467 2.39 1.247l.105 .16l8.114 13.548a2.914 2.914 0 0 1 -2.307 4.363l-.195 .008h-16.225a2.914 2.914 0 0 1 -2.582 -4.2l.099 -.185l8.11 -13.538a2.914 2.914 0 0 1 2.491 -1.403zm.01 13.33l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007zm-.01 -7a1 1 0 0 0 -.993 .883l-.007 .117v4l.007 .117a1 1 0 0 0 1.986 0l.007 -.117v-4l-.007 -.117a1 1 0 0 0 -.993 -.883z" />
        </Svg>
    );
}

const styles = StyleSheet.create({
    alert: {
        marginTop: 200,
        marginBottom: 20
    }
})
