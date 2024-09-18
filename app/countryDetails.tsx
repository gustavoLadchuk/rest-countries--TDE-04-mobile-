import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#292929",
        alignItems: "center",
        padding: 15
    },
    flag: {
        width: 300,
        height: 200
    },
    countryInfo: {
        color: "white",
        fontSize: 20,
        textAlign: "center"
    },
    infoContainer: {
        alignItems: "center",
        gap: 10
    }
})

type countryDetails = {
    name: {
        common: string,
        official: string

    },
    capital: string,
    region: string,
    languages: {},
    flags: {
        png: string
    }
    currencies: {},
    latlng: number[],
    area: number,
    population: number
}

const countryDetails = () => {

    const params = useLocalSearchParams()

    const [country, setCountry] = useState<countryDetails>()

    const [loading, setLoading] = useState(true)

    const getCountry = async () => {

        const { data } = await axios.get(`https://restcountries.com/v3.1/name/${params.name}?fullText=true`)
        setCountry(data[0])
        setLoading(false)
    }

    useEffect(() => {
        getCountry()
    }, [])

    return (
        <SafeAreaView style={styles.screen}>
            {loading ?
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size={50} />
                </View>
                :
                <View style={styles.infoContainer}>
                    <Image src={country?.flags?.png} style={styles.flag} />

                    <Text style={styles.countryInfo}>Common name: {country?.name?.common}</Text>
                    <Text style={styles.countryInfo}>Official name: {country?.name?.official}</Text>
                    <Text style={styles.countryInfo}>Capital: {country?.capital}</Text>
                    <Text style={styles.countryInfo}>Currency:
                        {Object.entries(country?.currencies || { name: "no data" })[0][0]}</Text>
                    <Text style={styles.countryInfo}>Lat: {country?.latlng[0]}</Text>
                    <Text style={styles.countryInfo}>Long: {country?.latlng[1]}</Text>
                    <Text style={styles.countryInfo}>Languages:
                        {Object.values(country?.languages || { name: "no data" }).join(", ")}</Text>
                    <Text style={styles.countryInfo}>Area: {country?.area}</Text>
                    <Text style={styles.countryInfo}>Population: {country?.population}</Text>
                </View>
            }
        </SafeAreaView>
    );
}

export default countryDetails;