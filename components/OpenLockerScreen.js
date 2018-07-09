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

export default class OpenLockerScreen extends Component {
	componentDidMount() {
		Orientation.lockToLandscape();
	}

	render() {
		const { navigation } = this.props;

		return (
			<ImageBackground source={appBG} style={openLockerStyles.container} alt='bg'>
				<View style={openLockerStyles.card}>
					<View style={openLockerStyles.leftContainer}>
						<Text style={openLockerStyles.leftText}>Locker</Text>
						<Text style={openLockerStyles.leftText}>Successfully</Text>
						<Text style={openLockerStyles.leftTextBold}>Opened!</Text>
					</View>
					<View style={openLockerStyles.line}>
						<Text></Text>
					</View>
					<View style={openLockerStyles.rightContainer}>
						<View style={openLockerStyles.exitButton}>
							<Button title="Exit" style={{fontSize: 18}} onPress={() => navigation.navigate('Home')}/>	
						</View>
	  				</View>
				</View>
				
			</ImageBackground>
		)
	}
}

const openLockerStyles = StyleSheet.create({
	container: {
		padding: 30,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	card: {
		flex: 1,
		flexDirection: 'row',
		width: '100%',
		backgroundColor: 'white',
		borderRadius: 10,
		justifyContent: 'center',
		paddingTop: 30,
		paddingBottom: 30
	},
	leftContainer: {
		width: '40%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	leftText: {
		fontWeight: '400',
		fontSize: 20,
		textAlign: 'center',
		color: '#519FE2'
	},
	leftTextBold: {
		fontWeight: '700',
		fontSize: 20,
		textAlign: 'center',
		color: '#519FE2'
	},
	line: {
		width: '1%',
		height: '100%',
		borderRightColor: 'black',
		borderRightWidth: 1
	},
	rightContainer: {
		paddingLeft: 20,
		paddingRight: 20,
		width: '59%',
		justifyContent: 'center'
	},
	exitButton: {
		width: '70%',
		alignSelf: 'center', 
		backgroundColor: '#519FE2', 
		borderRadius: 5
	}
})