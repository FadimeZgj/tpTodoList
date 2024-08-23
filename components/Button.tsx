import { Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import { ThemedText } from "./ThemedText";

declare type Props = { onPress:()=>void,title: string }

export default function Button({ onPress, title }: Props) {

    return <TouchableOpacity onPress={onPress}  style={styles.button}>
                <Text style={styles.text} >{title}</Text>
    </TouchableOpacity>

}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        margin: '3%'
    },
    text: {
        color: '#fff',
        fontSize: 18,
    },
})