import React, { Component } from 'react';
import Modal from 'react-native-modal';
import { Text } from 'react-native';
import { View, Button} from 'native-base';

// TODO:
// 1. Review layout from powerpoint
// 2. Implement Front-End layout
// 3. Implement Back-End Data collection in componentWillMount function
// 4. Display Back-End Data to Front-End

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