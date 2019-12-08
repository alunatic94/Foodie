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
        //console.log("YelpRequestHandler - Getting Yelp request via Axios - get():\n" + JSON.stringify(this.config));
        axios.get(this.apiUrl, this.config).then((res) => {
            this.response = res.data.businesses;
            //console.log("YelpRequestHandler - Returned from Axios get():\n" + JSON.stringify(response.data));
            console.log(res.data.businesses);
            return res;
        }).catch((err) => {
            //console.log("Yelp request via Axios failed: " + err);
            return err;
        })
    }

    response() {
        return this.response;
    }

    async getRestaurantsByRadius() {
        // url = ENDPOINTS['business'] + 'search';
        // parameters = {
        //     latitude: latitude,
        //     longitude: longitude,
        //     //radius: radius, // max 25 miles
        //     limit: 2,
        //     categories: 'restaurants'
        // }
        //console.log("YelpRequestHandler - Sending to Yelp: \nurl:\n" + url + "\nparams:\n" + JSON.stringify(params));
        //req = new YelpRequest(url, parameters);
        // req.get().then((res) => {
        //     //console.log("YelpRequestHandler - Received from Yelp:\n" + JSON.stringify(res.data) + "\n\n\n");
        //     console.log("getRestaurantsByRadius Received\n\n\ ");
        //     return res;
        // }).catch((err) => {
        //         console.log("Yelp request via YelpRequest.get() failed: " + err);
        //     })
        axios.get(this.apiUrl, this.config).then((res) => {
            this.response = res.data.businesses;
            //console.log("YelpRequestHandler - Returned from Axios get():\n" + JSON.stringify(response.data));
            console.log(res.data.businesses);
            return res.data.businesses;
        }).catch((err) => {
            //console.log("Yelp request via Axios failed: " + err);
            return err;
        })


    }
}