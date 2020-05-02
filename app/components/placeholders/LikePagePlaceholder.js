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
          <Content style={{ marginTop: 10, flexDirection: "column" }}>
          <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    //justifyContent: "left",
                    marginLeft: 20,
                    marginBottom: 5
                  }}
                  >
                    <View
                        style={{
                                width: 70,
                                height: 70,
                                borderRadius: 100,
                                backgroundColor: 'lightgray',
                                left: 0,
                                }}
                                
                    />
                    <View style={{
                    flexDirection: "column"}}>
                      <View style={{ width: 75, height: 15, backgroundColor: 'lightgray', paddingBottom: 15, marginLeft: 20}} />
                      <View style={{ width: 100, height: 10, backgroundColor: 'lightgray', marginTop: 5, marginLeft: 20}} />  
                    </View>
            </View>
            <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    //justifyContent: "left",
                    marginLeft: 20,
                    marginBottom: 5
                  }}
                  >
                    <View
                        style={{
                                width: 70,
                                height: 70,
                                borderRadius: 100,
                                backgroundColor: 'lightgray',
                                left: 0,
                                }}
                                
                    />
                    <View style={{
                    flexDirection: "column"}}>
                      <View style={{ width: 75, height: 15, backgroundColor: 'lightgray', paddingBottom: 15, marginLeft: 20}} />
                      <View style={{ width: 100, height: 10, backgroundColor: 'lightgray', marginTop: 5, marginLeft: 20}} />  
                    </View>
            </View>
            <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    //justifyContent: "left",
                    marginLeft: 20,
                    marginBottom: 5
                  }}
                  >
                    <View
                        style={{
                                width: 70,
                                height: 70,
                                borderRadius: 100,
                                backgroundColor: 'lightgray',
                                left: 0,
                                }}
                                
                    />
                    <View style={{
                    flexDirection: "column"}}>
                      <View style={{ width: 75, height: 15, backgroundColor: 'lightgray', paddingBottom: 15, marginLeft: 20}} />
                      <View style={{ width: 100, height: 10, backgroundColor: 'lightgray', marginTop: 5, marginLeft: 20}} />  
                    </View>
            </View>
          </Content>

      </Container>
        

      )
    }

        
}
export default withNavigation(LikePagePlaceholder);