import React from 'react';
import { Image } from 'react-native';
import { Container, Header, Left, Right, Body, Content, Button, Text, Input, SafeAreaView, View, FlatList } from 'native-base';
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
            autocompleteResult: []
        };
    }

    componentDidMount() {
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
                latitude: this.state.origLat,
                longitude: this.state.origLong,
                categories: "restaurants",
                limit: 20,
                //radius: 40000
            }
        }).then((res) => {
            this.setState({
                autocompleteResult: res.data,
                isLoaded: true
            });
            console.log(this.state.autocompleteResult.businesses)
        }).catch((err) => {
            console.log("Yelp request via Axios failed: " + err);
            return err;
        })
    }

    render() {
        return (
            <Content>
                <SearchBar placeholder="Search restaurants.."
                    onChangeText={this.updateSearch}
                    lightTheme
                    placeholderTextColor='grey'
                    value={this.state.search} />

                
            </Content>
        );
    }
}