import { Image, StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";

declare type Props = { title: string }

export default function Card({ title }: Props) {

    return <View style={styles.card}>
        <ThemedText type="subtitle">{title}</ThemedText>
    </View>

}

const styles = StyleSheet.create({
    card: {
        width: 150,
        height: 200,
        backgroundColor: "#eee",
        marginRight: 8
    }
})