import React, { Component } from 'react';
import Orientation from 'react-native-orientation';
import {
	Button,
	Image,
	ImageBackground,
	StyleSheet,
	Text,
	View
} from 'react-native';


import appBG from '../images/app_bg.png';

export default class EnterPinScreen extends Component {

	componentDidMount() {
		Orientation.lockToLandscape();
	}

	render() {
		const phoneNumber = this.props.navigation.getParam('phoneNumber', '0');

		return (
			<ImageBackground source={appBG} style={pinStyles.container} alt='bg'>
				<Text>{phoneNumber}</Text>
			</ImageBackground>
		)
	}
}

const pinStyles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 30,
		alignItems: 'center',
		justifyContent: 'center'
	}
})