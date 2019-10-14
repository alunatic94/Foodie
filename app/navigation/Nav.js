import React from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Text } from 'native-base';
import { createAppContainer, StackActions, NavigationActions} from 'react-navigation';


class Nav extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
          active: false,          
        };
    //     this.handlePress = this.handlePress.bind(this);
      }

      // TODO: implement navigation
    //   handlePress(arg){
    //     this.setState(state => ({          
    //       screen:this.props.navigation.dispatch(StackActions.reset({
    //         index:0,
    //         actions:[
    //           NavigationActions.navigate({ routeName: arg})
    //         ]
    //       }))
    //     }))
    //   }

      render() {          
        return (
            <Container>            
            <Content />
            <Footer>
              <FooterTab>
                <Button
                        // onPress={this.handlePress(screen)}
                      >
                  <Text>Map</Text>
                </Button>                
                <Button>
                  <Text>Feed</Text>
                </Button>
                <Button>
                  <Text>Profile</Text>
                </Button>
              </FooterTab>
            </Footer>
          </Container>
        );              
    }    
}
export default Nav;