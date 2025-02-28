import { PropsWithChildren } from "react";
import { 
  Pressable,  
  Text, 
  StyleSheet,  
} from "react-native"

// type Props = PropsWithChildren<{
//     icon: ImageSourcePropType,
//     text: string,
// }>;

export function PermissionView () {
  return (
      <>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Dar permiso a la ca&acute;mara</Text>
        </Pressable>
      </>
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
