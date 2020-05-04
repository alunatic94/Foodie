import { StyleSheet } from 'react-native'

export const AquaMain = '#6fdedc'
export const AquaSecondary = '#6fdeb9'

export const globalStyles = StyleSheet.create({
    centered: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    screenHeader: {
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray'
    },
    heading: {
        color: "#000",
        fontFamily: "Raleway Bold",
        fontSize: 20,
        paddingTop: 10
    },
    headingSmall: {
        color: "#000",
        fontFamily: "Raleway Bold",
        fontSize: 18
    },
    headingLarge: {
        color: "#000",
        fontFamily: "Raleway Bold",
        fontSize: 23
    },
    regularText: {
        color: "#000",
        fontFamily: "Nunito Sans",
        fontSize: 16
    },
    regularTextLarge: {
        color: "#000",
        fontFamily: "Nunito Sans",
        fontSize: 18
    },
    regularTextSmall: {
        color: "#000",
        fontFamily: "Nunito Sans",
        fontSize: 12
    },
    lightText: {
        color: "gray",
        fontFamily: "Nunito Sans",
        fontSize: 16
    },
    card: {
        borderRadius: 10,
        borderWidth: 0,
        borderColor: 'transparent'
    },
    cardItem: {
        borderWidth: 0,
        borderColor: 'transparent',
        backgroundColor: 'transparent'
    },
});

export const badgeColors = {
    "first": AquaMain,
    "ten": AquaSecondary,
    'twenty': '#FFBE3D',
    'fifty': '#FF953D',
    'hundred': '#FF473D'
}

