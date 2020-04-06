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
                    {this.props.other ? <ScreenHeader navigation = {this.props.navigation} />
                    : <ScreenHeader navigation = {this.props.navigation} back />
                    }
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