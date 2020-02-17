import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Left, Right, Body, Content, Button, Text, Input, SafeAreaView, View, FlatList } from 'native-base';
import styles from './styles.js';
import { SearchBar } from 'react-native-elements';
import axios from 'axios';

export default class SearchRestaurants extends Component {

    state = {
        search: ''
    }
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            latitude: 0,
            longitude: 0,
            isLoaded: false,
            autocompleteResults: []
        };
    }

    updateSearch = search => {
        this.setState({ search });
        this.autocompleteRestaurants(search);
    };

    componentDidMount() {
        const { like, meh, dislike } = this.props;
        this.setState({ like, meh, dislike });
        this.getUser();

        navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    origLat: position.coords.latitude,
                    origLong: position.coords.longitude,
                    error: null
                });
            },
            error => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 200000, maximumAge: 2000 }
        );
    }

    autocompleteRestaurants = (search) => {
        axios.get('https://api.yelp.com/v3/autocomplete', {
            headers: { 'Authorization': 'Bearer 6wdE42fE4oWYKFvwpLn-FmGqaWQpmyjeAHQ2_jWwnuNqRB7-cSAkHcdOvxf4gK-3Xw3QDmGhHBv93U1e0yIsqjauRsKyW0fnbGE7VVBRbyLlSfSnbuSrbWP2karAXXYx' },
            params: {
                text: search,
                latitude: this.state.origLat,
                longitude: this.state.origLong,
                categories: "restaurants",
                limit: 20,
                radius: 40000
            }
        }).then((res) => {
            this.setState({
                autocompleteResults: res.data,
                isLoaded: true
            });
            console.log(this.state.autocompleteResults);
        }).catch((err) => {
            console.log("Yelp request via Axios failed: " + err);
            return err;
        })
    }

    render() {
        <Content>
            <SearchBar placeholder="location"
                onChangeText={this.updateSearch}
                lightTheme
                placeholderTextColor='grey'
                value={search} />
        </Content>
    }
}

