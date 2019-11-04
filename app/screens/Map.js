import React from 'react';
import MapView from "react-native-maps";
import { Container, Left, Body, Right,  Button, Header, Item, Icon, Input, Text} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {logout} from '../screens/Login.js';

class Map extends React.Component{ 
  constructor(props) {
    super(props);
    this.state = {
      showSearch: false
    };
}

searchOn = () => {
  this.setState({ showSearch: true});
};
searchOff = () => {
  this.setState({ showSearch: false});
};
    render(){
      return(        
          <Container>

            <Header searchBar rounded>
                  <Left>
                    <Button 
                        transparent
                         onPress={() => this.props.navigation.navigate('AddPostPhoto')}> 
                        <AntDesign name='pluscircle' style={{fontSize: 30, color: 'black'}} />
                     </Button>
                  </Left>

                  <Body>
                  {this.state.showSearch ?
                    <Item>
                    <Icon name="ios-search" />
                    <Input placeholder="Search" />
                    <Button transparent>
                     <Text onPress={this.searchOff}>Cancel</Text>
                  </Button>
                    </Item>
                  :
                    <Text>Find a Restaurant</Text>
                  }
                  </Body>

                 
                  <Right>
                  {this.state.showSearch ?
                    null
                  :
                    <Button transparent onPress={this.searchOn}>
                      <Icon name="ios-search" />
                    </Button>
                  }
                   
                    <Button 
                      transparent
                      onPress={() => logout(this.props.navigation)}>
                         <AntDesign name='logout' style={{fontSize: 30, color: 'black'}} />
                     </Button>
                  </Right>
            </Header>



            <MapView
              style={{flex: 5}}
              initialRegion={{
                // 37.78825, -122.4324
                latitude: 34.241089,
                longitude: -118.527509,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
              }}
        />       
          </Container>        
      )
    }
  }
  export default Map; 