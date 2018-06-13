import React, { Component } from 'react';
import {
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
	}

	render() {

		return (
			<ImageBackground source={appBG} alt="bg" style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
				<Text>Select Locker</Text>
				<Button
				title="Go Home" 
				onPress={() =>
					this.props.navigation.navigate('Samples')
				} />
				<Button
				title="Go Home" 
				onPress={() =>
					this.props.navigation.navigate('Home')
				} />
			</ImageBackground>
		)
	}

}