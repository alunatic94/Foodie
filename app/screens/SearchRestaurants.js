import React, { useState } from 'react';
import { Image, Button } from 'react-native';
import { Container, Header, Left, Right, Body, Content, Text, Input, SafeAreaView, View, FlatList } from 'native-base';
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
            isLoaded: false,
            isInitialized: false,
            autocompleteResult: [],
        };
    }

    async componentDidMount() {
        // navigator.geolocation.getCurrentPosition(
        //     position => {
        //         this.setState({
        //             latitude: position.coords.latitude,
        //             longitude: position.coords.longitude,
        //             origLat: position.coords.latitude,
        //             origLong: position.coords.longitude,
        //             error: null
        //         });
        //         if (this.state.isInitialized == false) {
        //             this.initializeAutocomplete();
        //         } else {
        //             this.autocompleteRestaurants(search);
        //         }
        //     },
        //     error => this.setState({ error: error.message }),
        //     { enableHighAccuracy: true, timeout: 200000, maximumAge: 2000 }
        // );
        this.setState({
            latitude: this.props.navigation.state.params.lat,
            longitude: this.props.navigation.state.params.long
        });
        this.refs.searchBar.focus();
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

    initializeAutocomplete = () => {
        axios.get('https://api.yelp.com/v3/autocomplete', {
            headers: { 'Authorization': 'Bearer 6wdE42fE4oWYKFvwpLn-FmGqaWQpmyjeAHQ2_jWwnuNqRB7-cSAkHcdOvxf4gK-3Xw3QDmGhHBv93U1e0yIsqjauRsKyW0fnbGE7VVBRbyLlSfSnbuSrbWP2karAXXYx' },
            params: {
                text: "c",
                latitude: this.state.origLat,
                longitude: this.state.origLong,
                categories: "restaurants",
                limit: 20,
                //radius: 40000
            }
        }).then((res) => {
            this.setState({
                isInitialized: true
            });
        }).catch((err) => {
            console.log("Yelp request via Axios failed: " + err);
            return err;
        })
    }

    _renderItem = ({ item, index }) => {
        return (
            <View style={styles.item}>
                <Text>ITEM</Text>
            </View>
        )
    }

    render() {
        let { autocompleteResult, isLoaded, isInitialized } = this.state;
        const { goBack } = this.props.navigation;
        if (isLoaded) {
            return (
                <Content>
                    <SearchBar placeholder="Search restaurants.."
                        onChangeText={this.updateSearch}
                        lightTheme
                        placeholderTextColor='grey'
                        value={this.state.search}
                        autoCorrect={false}
                    />

                    {/* <FlatList
                        data={autocompleteResult}
                        renderItem={this._renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    /> */}
                    {
                        this.state.autocompleteResult.map(r => {
                            return <Button
                                title={r.name}
                                key={r.id}
                                color='#696969'

                                onPress={() => {
                                    this.props.navigation.state.params.onGoBack(r.id);
                                    this.props.navigation.goBack();
                                }}
                            // text={b.text}
                            // onPress={b.action}
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