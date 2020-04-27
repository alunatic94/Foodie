import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Constants from 'expo-constants';
const styles = StyleSheet.create({
  screenHeader: {
      borderBottomWidth: 1,
      borderBottomColor: 'lightgray'
  },
  centered: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  centeredTest: {
    flex: 1,
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
    flexDirection: 'row',
    justifyContent: 'center'
  },
  heading: {
    color: "#000",
    fontFamily: "Raleway Bold",
    fontSize: 20,
    paddingTop: 10
  },
  headingSmall: {
    color: "#000",
    fontFamily: "Raleway Bold",
    fontSize: 18
  },
  headingLarge: {
    color: "#000",
    fontFamily: "Raleway Bold",
    fontSize: 23
  },
  subheading: {
    color: "gray",
    fontFamily: "Raleway",
    fontSize: 18
  },
  subheadingLarge: {
    color: "gray",
    fontFamily: "Raleway",
    fontSize: 20
  },
  regularText: {
    color: "#000",
    fontFamily: "Nunito Sans",
    fontSize: 16
  },
  regularTextLarge: {
    color: "#000",
    fontFamily: "Nunito Sans",
    fontSize: 18
  },
  regularTextSmall: {
    color: "#000",
    fontFamily: "Nunito Sans",
    fontSize: 12
  },
  lightText: {
    color: "gray",
    fontFamily: "Nunito Sans",
    fontSize: 16
  },
  lightTextLarge: {
    color: "#000",
    fontFamily: "Nunito Sans",
    fontSize: 18
  },
  lightTextSmall: {
    color: "gray",
    fontFamily: "Nunito Sans",
    fontSize: 12
  },
  circleSmall: {
    width: 30,
    height: 30,
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
  padding: { paddingLeft: 10, paddingRight: 10, paddingTop: 10 },
  columnStyle: { height: 200, padding: 5 },
  columnSmall: {height: 100, padding: 5},

  commentsFooter: {
    display: "flex",
    flexDirection: "row",
    // marginBottom: 10
  },
  postButton: {
    display: 'flex',
    justifyContent: 'center',
    paddingRight: 10
  },
  profileModal: {
    borderRadius: 10,
    padding: 5,
    backgroundColor: '#ddd'
  }
});
export default styles; 