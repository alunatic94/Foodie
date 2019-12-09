// 'use strict';

// const yelp = require("yelp-fusion");

// // Place holder for Yelp Fusion's API Key. Grab them
// // from https://www.yelp.com/developers/v3/manage_app
// const apiKey = "6wdE42fE4oWYKFvwpLn-FmGqaWQpmyjeAHQ2_jWwnuNqRB7-cSAkHcdOvxf4gK-3Xw3QDmGhHBv93U1e0yIsqjauRsKyW0fnbGE7VVBRbyLlSfSnbuSrbWP2karAXXYx"

// const apiHost = "https://api.yelp.com"
// const searchPath = "/v3/businesses/search"
// const businessPath = "/v3/businesses/"
// const searchRequest = {
//     term: 'in n out',
//     location: 'northridge, ca'
// };

// const client = yelp.client(apiKey);

// export function testSearch () {
//     client.search(searchRequest).then(response => {
//         const firstResult = response.jsonBody.businesses[0];
//         //const businessID = response.jsonBody.id;
//         //const prettyJson = JSON.stringify(firstResult, null, 4);
//         //const prettyID = JSON.stringify(businessID, null, 4);
//         //console.log(prettyJson);
//         //console.log(prettyID);
//         console.log(firstResult.coordinates);
//     }).catch(e => {
//         console.log(e);
//     });
// }