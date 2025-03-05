import { Link, RelativePathString } from "expo-router";
import { PropsWithChildren } from "react";
import { 
  Pressable, 
  Image, 
  Text, 
  StyleSheet, 
  ImageSourcePropType 
} from "react-native"

type Props = PropsWithChildren<{
    icon: ImageSourcePropType
    text: string
    route: RelativePathString
    buttonFunction: null | (() => void) 
}>;

export function MenuButton ({ 
    icon, 
    text, 
    route,
    buttonFunction
}: Props) {
  return (
    <Link href={route} asChild>
      <Pressable onPress={buttonFunction} style={styles.button}>
        <Image source={icon} style={{ width: 36, height: 36, resizeMode: 'center' }} />
        <Text style={styles.buttonText}>{text}</Text>
      </Pressable>
    </Link>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 250,
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: '#2196F3',
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center'
  },

  buttonText: {
    fontSize: 15,
    fontWeight: 500,
    color: '#fff'
  },
});
