/*var yelpRequest = new YelpRequest('https://api.yelp.com/v3/businesses/search', {term: 'Arbor Grill', location: 'Northridge, CA'});
var yelpResponse = yelpRequest.get();
const restaurantJSON = yelpResponse.businesses[0];*/

const YELP_API_URL = 'https://api.yelp.com/v3'
const ENDPOINTS = {
    business: `${YELP_API_URL}/businesses/`,
    transactions: `${YELP_API_URL}/transactions/`,
    categories: `${YELP_API_URL}/categories/`
}
import axios from 'axios';

export default class YelpRequest {
    apiUrl = "";
    response = [];
    config = {
        headers: { 'Authorization': 'Bearer 6wdE42fE4oWYKFvwpLn-FmGqaWQpmyjeAHQ2_jWwnuNqRB7-cSAkHcdOvxf4gK-3Xw3QDmGhHBv93U1e0yIsqjauRsKyW0fnbGE7VVBRbyLlSfSnbuSrbWP2karAXXYx' },
        params: {}
    };
    constructor(apiUrl, paramArgs) {
        this.apiUrl = apiUrl;
        this.config.params = paramArgs;
    }

    async get() {
        var data = {};
        await axios.get(this.apiUrl, this.config)
        .then((response) => {
            this.response = response;
            data = response.data;
        })
        .catch((err) => {
            console.log("YelpRequestHandler - get(): Yelp request via Axios failed: " + err);
            return err;
        })
        return data;
    }

    response() {
        return this.response;
    }
    
    static async getRestaurantsByRadius(latitude, longitude, radius) {
        var data = {};
        url = ENDPOINTS['business'] + 'search';
        params = {
            latitude: latitude,
            longitude: longitude,
            categories: 'restaurants',
            limit: 1,
            radius: radius
        }
        req = new YelpRequest(url, params);
        await req.get().then((res) => {
           data = res.businesses;
        });
        return data;
    }
}