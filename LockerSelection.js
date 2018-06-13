import React, { Component } from 'react';
import {
	BackHandler,
	Button,
	ImageBackground,
	Text,
	View
} from 'react-native';
import Orientation from 'react-native-orientation';
import appBG from './images/app_bg.png';
import { createStackNavigator } from 'react-navigation';
import SampleScreen from './App';

export default class LockerSelection extends Component {

	componentDidMount() {
		Orientation.lockToLandscape();
		BackHandler.addEventListener('hardwareBackPress', this.hadleBackButton);
	}

	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.hadleBackButton);
	}

	hadleBackButton() {
		return true;
	}

	render() {

		const extra = this.props.navigation;
		const itemId = extra.getParam('itemId', 'no-id');
		const otherParam = extra.getParam('otherParam', 'default value'); 

		return (
			<ImageBackground source={appBG} alt="bg" style={{flex: 1, flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center'}}>
				<Text>{otherParam}</Text>
				<Button
				title="Go Samples" 
				onPress={() =>
					this.props.navigation.navigate('Samples')
				} />
				<Button
				title="Go Home" 
				onPress={() =>
					this.props.navigation.navigate('Home')
				} />
				<Button
				title="Go Back" 
				onPress={() =>
					this.props.navigation.goBack()
				} />
			</ImageBackground>
		)
	}

}