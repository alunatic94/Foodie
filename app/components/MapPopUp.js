import React, { Component } from 'react';
import Modal from 'react-native-modal';
import { Text } from 'react-native';
import { View, Button} from 'native-base';
// Functional component might be better

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