import AppNavigator from './navigation/router.js'
import { createStackNavigator } from 'react-navigation-stack';

//Screen navigator 
const AppNavigator2 = createStackNavigator({
  AddPostPhoto: {
    screen: AddPostPhoto
  },
  AddPostComment: {
    screen: AddPostComment
  },
  BackToMain: {
    screen: AppNavigator 
  }
})

export default AppNavigator2;