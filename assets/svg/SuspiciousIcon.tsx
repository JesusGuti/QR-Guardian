import Svg, { Path } from "react-native-svg";
import { StyleSheet } from "react-native";

export function SuspiciousIcon () {
    return (
        <Svg    
            width="192"  
            height="192"  
            viewBox="0 0 24 24"  
            fill="none"  
            stroke="#ffffff"  
            stroke-width="2"  
            stroke-linecap="round"  
            stroke-linejoin="round"
            style={styles.shield}
        >
            <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <Path d="M12 16v.01" />  
            <Path d="M12 13a2 2 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483" />
            <Path d="M10 20.777a8.942 8.942 0 0 1 -2.48 -.969" />
            <Path d="M14 3.223a9.003 9.003 0 0 1 0 17.554" />
            <Path d="M4.579 17.093a8.961 8.961 0 0 1 -1.227 -2.592" />
            <Path d="M3.124 10.5c.16 -.95 .468 -1.85 .9 -2.675l.169 -.305" />
            <Path d="M6.907 4.579a8.954 8.954 0 0 1 3.093 -1.356" />
        </Svg>
    )
}

const styles = StyleSheet.create({
    shield: {
        marginTop: 100
    }
});
