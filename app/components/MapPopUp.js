import React, { Component } from 'react';
import Modal from 'react-native-modal';
import { Marker } from 'react-native-maps';
import { List, Card, CardItem, Text, Body, View, Button, ListItem, Left, Thumbnail } from 'native-base';

// TODO:
// 1. Review layout from powerpoint
// 2. Implement Front-End layout
// 3. Get restaurant data from Map
// 4. Implement Back-End Data collection in componentWillMount function
// 5. Display Back-End Data to Front-End

// Temp Image
const image = require('../screens/assets/howlin.png');
 export class MapPopUp extends Component{

    constructor(props){
        super(props);
        this.state = {
            show: true
        };        
    }
     render(){
        return(
            <View>
                <Modal isVisible={this.state.show}>
                    <Card>
                        <CardItem header>
                            <Text>{this.props.title}</Text>
                            </CardItem>
                            <CardItem>
                            <Body>
                                <Text>
                                    {this.props.description}                                
                                </Text>
                                <List>
                                    <ListItem avatar>
                                        <Left>
                                            <Thumbnail source={image}/>
                                        </Left>                                        
                                    </ListItem>                                    
                                </List>                                
                            </Body>
                            </CardItem>                            
                            <CardItem footer>
                            <Text>Contact</Text>
                        </CardItem>
                    </Card>
                    <Text>Try this</Text>
                    <Button
                    onPress={() => {this.setState({show: !this.state.show})}}
                    >
                    <Text>close</Text>
                    </Button>
                </Modal>                
            </View>
   
        );    
     }     
}