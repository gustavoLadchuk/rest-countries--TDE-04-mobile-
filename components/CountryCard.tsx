import { Image, StyleSheet, Text, View } from "react-native";
import { country } from "./types/types";
import { Link } from "expo-router";

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#383838",
        width: 350,
        height: 120,
        flexDirection: "row",
        alignItems: "center",
        padding: 10
    },
    flag: {
        width: 100,
        height: 70
    },
    textContainer: {
        paddingHorizontal: 30,
        width: "70%"
    },
    nameCommon: {
        color: "white",
        fontSize: 18,
        fontWeight: "700"
    },
    nameOfficial: {
        color: "white"
    },
    capital: {
        color: "white",
        marginTop: 5
    },
    region: {
        color: "gray"
    }
})



const CountryCard = ({ name, capital, region, flags }: country) => {
    return (
        <Link href={`/countryDetails?name=${name.official}`}>
            <View style={styles.card}>
                <View>
                    <Image src={flags.png} style={styles.flag} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.nameCommon}>{name.common}</Text>
                    <Text style={styles.nameOfficial}>({name.official})</Text>
                    <Text style={styles.capital}>Capital: {capital}</Text>
                    <Text style={styles.region}>{region}</Text>
                </View>
            </View>
        </Link>

    );
}

export default CountryCard;