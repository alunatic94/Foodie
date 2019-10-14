import React from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Text } from 'native-base';
import { createAppContainer, StackActions, NavigationActions} from 'react-navigation';


class Nav extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
          active: false,          
        };    
      }

      navigateScreen = (ScreenName) => {
        this.props.navigation.dispatch(StackActions.reset({
          index:0,
          actions:[
            NavigationActions.navigate({ routeName: ScreenName})
          ]
        }))
      }    

      render() {          
        return (
            <Container>            
            <Content />
            <Footer>
              <FooterTab>
                <Button
                onPress = { () => {
                  this.navigateScreen("Map")}}
                      >
                  <Text>Map</Text>
                </Button>                
                <Button
                onPress = { () => {
                  this.navigateScreen("Feed")}}>
                  <Text>Feed</Text>
                </Button>
                <Button
                onPress = { () => {
                  this.navigateScreen("Profile")}}>
                  <Text>Profile</Text>
                </Button>
              </FooterTab>
            </Footer>
          </Container>
        );              
    }    
}
export default Nav;