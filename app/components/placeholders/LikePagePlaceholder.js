import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Icon, Button, Container, Header, Left, Footer, Right, ListItem, Thumbnail, Content, Item, Input, Body } from 'native-base';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { withNavigation, ScrollView } from "react-navigation";
 class LikePagePlaceholder extends Component {
    render(){
      return(
        <Container>
                    <Header>
            <Left>
              <Button
                iconLeft
                light
                onPress={() => {
                  this.props.navigation.goBack();
                }}
              >
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Text style={{
              color: "grey",
              fontFamily: "Raleway Bold",
              fontSize: 15
            }}></Text>
          </Header>
          <Content style={{ marginTop: 30 }}>
          <View
            style={{
                    width: 70,
                    height: 70,
                    borderRadius: 100,
                    backgroundColor: 'lightgray',
                    marginBottom: 10,
                    marginLeft:25  
                    }}
                    
        />
        <View
            style={{
                    width: 70,
                    height: 70,
                    borderRadius: 100,
                    backgroundColor: 'lightgray',
                    marginBottom: 10,
                    marginLeft:25   
                    }}
                    
        />
        <View
            style={{
                    width: 70,
                    height: 70,
                    borderRadius: 100,
                    backgroundColor: 'lightgray',
                    marginBottom: 10,
                    marginLeft:25   
                    }}
                    
        />
        <View
            style={{
                    width: 70,
                    height: 70,
                    borderRadius: 100,
                    backgroundColor: 'lightgray',
                    marginBottom: 10,
                    marginLeft:25    
                    }}
                    
        />
          </Content>

      </Container>
        

      )
    }

        
}
export default withNavigation(LikePagePlaceholder);