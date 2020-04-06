import React, { useState } from 'react';
import { Image, Button } from 'react-native';
import { Container, Header, Left, Right, Body, Content, Text, Input, View } from 'native-base';
import styles from './styles.js';
import { SearchBar } from 'react-native-elements';
import axios from 'axios';

export default class SearchRestaurants extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            search: '',
            latitude: 0,
            longitude: 0,
            neededLoc: false,
            isLoaded: false,
            isInitialized: false,
            location: [],
            autocompleteResult: [],
        };
    }

    async componentDidMount() {
        if (this.props.navigation.state.params.lat == 0 && this.props.navigation.state.params.long == 0) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    this.setState({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        origLat: position.coords.latitude,
                        origLong: position.coords.longitude,
                        location: position.coords,
                        isInitialized: true,
                        neededLoc: true,
                        error: null
                    });
                },
                error => this.setState({ error: error.message }),
                { enableHighAccuracy: true, timeout: 200000, maximumAge: 2000 }
            );
        } else {
            this.setState({
                latitude: this.props.navigation.state.params.lat,
                longitude: this.props.navigation.state.params.long,
                isInitialized: true
            });
        }
        //this.refs.searchBar.focus();
    }

    updateSearch = search => {
        this.setState({ search });
        if (search != '') {
            this.autocompleteRestaurants(search);
        } else {
            this.setState({
                search: '',
                isLoaded: false
            });
        }
    };

    getLocation = () => {
        return location = [latitude, longitude];
    }

    autocompleteRestaurants = (search) => {
        axios.get('https://api.yelp.com/v3/autocomplete', {
            headers: { 'Authorization': 'Bearer 6wdE42fE4oWYKFvwpLn-FmGqaWQpmyjeAHQ2_jWwnuNqRB7-cSAkHcdOvxf4gK-3Xw3QDmGhHBv93U1e0yIsqjauRsKyW0fnbGE7VVBRbyLlSfSnbuSrbWP2karAXXYx' },
            params: {
                text: search,
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                categories: "restaurants",
                limit: 50,
                //radius: 40000
            }
        }).then((res) => {
            this.setState({
                autocompleteResult: res.data.businesses,
                isLoaded: true
            });
            console.log(this.state.autocompleteResult)
        }).catch((err) => {
            console.log("Yelp request via Axios failed: " + err);
            return err;
        })
    }

    render() {
        let { autocompleteResult, isLoaded, isInitialized } = this.state;
        const { goBack } = this.props.navigation;
        if (!isInitialized) {
            return (
                <View style={styles.centeredTest}>
                    <Text>Loading...</Text>
                </View>
            )
        }
        else if (isLoaded) {
            return (
                <Content>
                    <SearchBar placeholder="Search restaurants.."
                        onChangeText={this.updateSearch}
                        lightTheme
                        placeholderTextColor='grey'
                        value={this.state.search}
                        autoCorrect={false}
                    />
                    {
                        this.state.autocompleteResult.map(r => {
                            return <Button
                                title={r.name}
                                key={r.id}
                                color='#696969'

                                onPress={() => {
                                    this.props.navigation.state.params.onGoBack(r);
                                    temp = this.getLocation;
                                    if (this.state.neededLoc) {
                                        this.props.navigation.state.params.location(this.state.location);
                                    }
                                    this.props.navigation.goBack();
                                }}
                            />;
                        })
                    }
                </Content>
            );
        } else {
            return (
                <Content>
                    <SearchBar placeholder="Search restaurants.."
                        ref="searchBar"
                        onChangeText={this.updateSearch}
                        lightTheme
                        placeholderTextColor='grey'
                        value={this.state.search} />
                </Content>
            );

        }
    }
}