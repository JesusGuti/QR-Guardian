import Svg, { Path } from "react-native-svg"

export default function BackArrowIcon () {
    return (
        <Svg  
            width="48"  
            height="48"  
            viewBox="0 0 24 24"  
            fill="none"  
            stroke="#ffffff"  
            stroke-width="2"  
            stroke-linecap="round"  
            stroke-linejoin="round"  
        >
            <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <Path d="M5 12l14 0" />
            <Path d="M5 12l4 4" />
            <Path d="M5 12l4 -4" />
        </Svg>
    )
}
