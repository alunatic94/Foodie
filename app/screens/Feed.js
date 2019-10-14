import React from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Text } from 'native-base';
import { createAppContainer, StackActions, NavigationActions} from 'react-navigation';
import Nav from '../navigation/Nav.js';

class Feed extends React.Component{

      render() {
        return (
            <Container>
              <Nav/>
          </Container>
        );
    }
}
export default Feed;