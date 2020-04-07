import React, { Component } from 'react';
import {Container, Content} from 'native-base';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import ImageAndTextPlaceholder from './ImageAndTextPlaceholder';
import TitleAndTextPlaceholder from './TitleAndTextPlaceholder';
import TitleAndIconsPlaceholder from './TitleAndIconsPlaceholder';
import TitleAndImagesPlaceholder from './TitleAndImagesPlaceholder';
import ScreenHeader from '../common/ScreenHeader.js';
 
export default class ProfilePlaceholder extends Component {
    render() {
        return (
            <Container>
                    <ScreenHeader navigation = {this.props.navigation} back={this.props.other}/>
                    <Content>
                        <ImageAndTextPlaceholder />
                        <TitleAndTextPlaceholder />
                        <TitleAndIconsPlaceholder />
                        <TitleAndImagesPlaceholder />
                    </Content>
            </Container>
        )
    }
}