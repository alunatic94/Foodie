/*var yelpRequest = new YelpRequest('https://api.yelp.com/v3/businesses/search', {term: 'Arbor Grill', location: 'Northridge, CA'});
var yelpResponse = yelpRequest.get();
const restaurantJSON = yelpResponse.businesses[0];*/

import axios from 'axios';
export default class YelpRequest {
    apiUrl = "";
    response = {};
    config = {
        headers: {'4FRV9p6hJ6w4vhEuqH65dg': '6wdE42fE4oWYKFvwpLn-FmGqaWQpmyjeAHQ2_jWwnuNqRB7-cSAkHcdOvxf4gK-3Xw3QDmGhHBv93U1e0yIsqjauRsKyW0fnbGE7VVBRbyLlSfSnbuSrbWP2karAXXYx'},
        params: {}
    };
    constructor(apiUrl, paramArgs) {
        this.config.params = paramArgs;
    }
    get() {
        axios.get(apiUrl, config)
        .then((response) => {
            this.response = response;
            return response;
        });
    }
    response() {
        return this.response;
    }

}