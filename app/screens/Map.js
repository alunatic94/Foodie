import React from 'react';
import MapView from "react-native-maps";
import { Container, Left, Right,  Button, Header, Item, Icon, Input, Text} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';

class Map extends React.Component{
    render(){
      return(        
          <Container>

            <Header searchBar rounded>
                  <Left>
                    <Button 
                        transparent
                         onPress={() => this.props.navigation.navigate('AddPostPhoto')}> 
                        <AntDesign name='pluscircle' style={{fontSize: 30, color: 'white'}} />
                     </Button>
                  </Left>

                  <Item>
                    <Icon name="ios-search" />
                    <Input placeholder="Search" />
                  </Item>

                  <Button transparent>
                     <Text>Search</Text>
                  </Button>

                  <Right>
                    <Button 
                      transparent
                      onPress={() => this.props.navigation.navigate('Login')}>
                         <AntDesign name='logout' style={{fontSize: 30, color: 'white'}} />
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