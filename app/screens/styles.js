import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
const styles = StyleSheet.create({
  centered: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  left: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  padded: {
    padding: '5%'
  },
  header: {
    paddingTop: getStatusBarHeight(),
    height: 54 + getStatusBarHeight(),
    backgroundColor: "#fff",
    color: "#000",
    fontFamily: "Raleway Bold"
  },
  headerBody: {
    flex: 3,
    flexDirection:'row',
    justifyContent:'center'
  },
  heading: {
    color: "#000",
    fontFamily: "Raleway Bold",
    fontSize: 20
  }, 
  headingLarge: {
    color: "#000",
    fontFamily: "Raleway Bold",
    fontSize: 23
  },
  subheading: {
    color: "gray",
    fontFamily: "Raleway",
    fontSize: 16
  },
  subheadingLarge: {
    color: "gray",
    fontFamily: "Raleway",
    fontSize: 20
  },
  regularText: {
    color: "#000",
    fontFamily: "Nunito Sans Bold",
    fontSize: 14
  },
  lightText: {
    color: "gray",
    fontFamily: "Nunito Sans",
    fontSize: 14
  },
  lightTextSmall: {
    color: "gray",
    fontFamily: "Nunito Sans",
    fontSize: 12
  },
  circleSmall: {
    width: 30,
    height:30,
    borderRadius: 15
  },
  imageFeed: {
    height: 200,
    width: null,
    flex: 1
  },
  imageFeedSmall: {
    height: 100,
    width: 150,
    flex: 1,
    margin: 10
  },
  roundSquare: {
    height: 100,
    width: 100,
    padding: 5,
    borderRadius: 10
  },
  roundCard: {
    height: 350,
    width: null,
    flex: 1,
    borderRadius: 20,
    margin: 10
  },
  padding: {paddingLeft: 10, paddingRight: 10, paddingTop: 10},
  columnStyle: { height: 200, padding: 10 },

  commentsFooter: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10
  },
  postButton: {
    display: 'flex',    
    justifyContent: 'center',
    paddingRight: 10
  },  
});
export default styles; 