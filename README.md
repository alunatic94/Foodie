# Foodie
COMP490/L 

"The Hotspots" 

Sivan Farnoush, Roni Tandoc, Alexis Siguenza, Aaron Tiania, Alberto Luna, Jason Dang, Vattanak Keo, Victor Pineda


Functionality

Vision/Description: 

Foodie is a mobile application which enables food enthusiasts to explore highly rated and interesting restaurants in their area according to their culinary interests. While viewing an interactive map of their campus or neighborhood, users can discover the top dining hot-spots trending within their social circle or local area. By providing a platform where people can seamlessly connect with others in their culinary community, Foodie brings a new, social way of diving into food and deciding what you want to eat.
 
 
Objectives/Requirements:

-The system shall display a real-time map to users that, when interacted with, will present information on nearby restaurants such as their cuisine type, busyness, and hotness rating. 

-The system shall implement live-tracking of the map via mobile GPS information that will correspond to a heat map of trending restaurant “hot spots.”

-The system shall allow users to search and filter this map by food interests, location, rating, and recommendations based on friends’ visits.

-The system shall allow users to view a historical list of restaurants that they and their friends have recently liked and/or visited in the nearby area.

-The system shall keep track of a customized list of restaurant recommendations based on food preferences, past visits by the user and friends, and local trends.

-The system shall allow users to create accounts and personalized profiles with their location, food preferences, and friend connections.

-The system shall utilize a database which will securely manage user and restaurant data that will be presented on the mobile app.


Roadmap

-Platform: Mobile application (cross platform - Android and iOS).

-Approximate Size: Medium, 30,000 - 50,000 lines of code.

-Tools & Software:
For the development of a cross-platform mobile application, we will be creating the frontend of our system in JavaScript using the mobile framework React Native. In order to store and organize user and restaurant data, we will be using a MySQL database. To access this data, analyze the relationships between them (e.g. create recommendations), and output these to the mobile frontend, we will be creating the server backend of our system in either Node.js with Express. Possible APIs that we will be using include: Recombee (recommender system) API, Google Maps API, and Yelp API.
