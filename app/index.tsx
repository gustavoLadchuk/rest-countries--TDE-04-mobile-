import CountryCard from "@/components/CountryCard";
import { country } from "@/components/types/types";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, SectionList, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#292929",
        alignItems: "center"
    },
    header: {
        backgroundColor: "#383838",
        width: "100%",
        height: 80,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
    },
    input: {
        width: "70%",
        height: 50,
        borderWidth: 3,
        backgroundColor: "#6e6e6e",
        padding: 5,
        fontSize: 15,
        color: "white"
    },
    listContainer: {
        alignItems: "center",
        paddingVertical: 10,
        width: "100%",
        height: "100%",
        gap: 10
    },
    title: {
        fontSize: 30,
        color: "white",
        fontWeight: "bold"
    },
    searchButton: {
        justifyContent: "center",
        alignItems: "center",
        width: 40,
        height: 40
    }

})

type countryList = {
    title: string,
    data: country[]
}

const index = () => {

    const [loading, setLoading] = useState(true)

    const [input, setInput] = useState("")

    const [countries, setCountries] = useState<countryList[]>(
        [
            {
                title: 'Americas',
                data: [],
            },
            {
                title: 'Europe',
                data: [],
            },
            {
                title: 'Africa',
                data: [],
            },
            {
                title: 'Asia',
                data: [],
            },
            {
                title: 'Oceania',
                data: [],
            },
            {
                title: 'Antarctic',
                data: [],
            },
        ]
    )

    const getCountries = async (input: string) => {

        let data: country[] = []

        if (input) {
            const response = await axios.get(`https://restcountries.com/v3.1/name/${input}?fullText=true`)
            data = response.data
        } else {
            const response = await axios.get("https://restcountries.com/v3.1/all")
            data = response.data
        }

        let countriesList = []

        const americaCountries = data.filter(country => country.region === "Americas")

        if (americaCountries.length > 0) countriesList.push({
            title: 'America',
            data: americaCountries,
        })

        const europeCountries = data.filter(country => country.region === "Europe")

        if (europeCountries.length > 0) countriesList.push({
            title: 'Europe',
            data: europeCountries,
        })

        const africaCountries = data.filter(country => country.region === "Africa")


        if (africaCountries.length > 0) countriesList.push({
            title: 'Africa',
            data: africaCountries,
        })

        const asiaCountries = data.filter(country => country.region === "Asia")

        if (asiaCountries.length > 0) countriesList.push({
            title: 'Asia',
            data: asiaCountries,
        })

        const oceaniaCountries = data.filter(country => country.region === "Oceania")

        if (oceaniaCountries.length > 0) countriesList.push({
            title: 'Oceania',
            data: oceaniaCountries,
        })

        const antarticCountries = data.filter(country => country.region === "Antarctic")

        if (antarticCountries.length > 0) countriesList.push({
            title: 'Antarctic',
            data: antarticCountries,
        })

        setCountries(countriesList)
        setLoading(false)
    }

    const handleSearchButton = () => {
        getCountries(input)
    }

    const handleClearButton = () => {
        setInput("")
        getCountries("")
    }

    useEffect(() => {
        getCountries("")
    }, [])


    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.header}>
                <TextInput style={styles.input} onChangeText={setInput} value={input} />

                <Pressable onPress={handleClearButton}>
                    <View style={styles.searchButton}>
                        <FontAwesome name="remove" size={30} color="white" />
                    </View>
                </Pressable>

                <Pressable onPress={handleSearchButton}>
                    <View style={styles.searchButton}>
                        <Ionicons name="search" size={30} color="white" />
                    </View>
                </Pressable>
            </View>


            {loading ?
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size={50} />
                </View>
                :
                <SectionList
                    sections={countries}
                    keyExtractor={(item, index) => String(index)}
                    renderItem={({ item }) => (
                        <CountryCard
                            name={item.name}
                            region={item.region}
                            capital={item.capital}
                            flags={item.flags}
                        />
                    )}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={styles.title}>{title}</Text>
                    )}
                    ItemSeparatorComponent={(() => {
                        return (
                            <View style={{ height: 10 }} />
                        )
                    })}
                />
            }


        </SafeAreaView>
    );
}

export default index;