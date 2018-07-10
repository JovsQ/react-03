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
import check from '../images/check_circle.png';
import phone from '../images/phone.png';

export default class OpenLockerScreen extends Component {
	componentDidMount() {
		Orientation.lockToLandscape();
	}

	render() {
		const { navigation } = this.props;

		const phoneNumber = this.props.navigation.getParam('phoneNumber', '0');
		const size = this.props.navigation.getParam('size', 'no size');
		const price = this.props.navigation.getParam('price', '0'); 

		return (
			<ImageBackground source={appBG} style={openLockerStyles.container} alt='bg'>
				<View style={openLockerStyles.card}>
					<View style={openLockerStyles.leftContainer}>
						<Image source={check} alt='check_circle' style={openLockerStyles.check}/>
						<Text style={openLockerStyles.leftText}>Locker</Text>
						<Text style={openLockerStyles.leftText}>Successfully</Text>
						<Text style={openLockerStyles.leftTextBold}>Opened!</Text>
					</View>
					<View style={openLockerStyles.line}>
						<Text></Text>
					</View>
					<View style={openLockerStyles.rightContainer}>
						<View style={openLockerStyles.rightLabel}>
							<Text style={openLockerStyles.rightLabelText}>Please proceed</Text>
							<Text style={openLockerStyles.rightLabelText}>to locker <Text style={openLockerStyles.highlightBlue}>No. 12</Text></Text>
						</View>
						<View style={openLockerStyles.rightDetails}>
							<Text style={openLockerStyles.rightLabelText}>For <Text style={openLockerStyles.highlightBlack}>Drop Off</Text></Text>
							<Text style={openLockerStyles.rightLabelText}>{size} - <Text style={openLockerStyles.highlightBlue}>P{price}.00</Text></Text>
							<Text style={openLockerStyles.rightLabelText}><Image source={phone} alt='phone' style={openLockerStyles.phone}/> {phoneNumber}</Text>
						</View>
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
	check: {
		aspectRatio: 1,
		resizeMode: 'contain',
		alignSelf: 'center',
		width: 30,
		height: 30
	},
	phone: {
		width: 30,
		height: 30
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
		padding: 20,
		width: '59%',
		justifyContent: 'center'
	},
	rightLabel: {
		flex: 2,
		width: '70%',
		alignSelf: 'center'
	},
	rightLabelText: {
		fontWeight: '400',
		fontSize: 18,
		textAlign: 'left',
		alignSelf: 'stretch'
	},
	rightDetails: {
		flex: 3,
		width: '70%',
		alignSelf: 'center'
	},
	exitButton: {
		width: '70%',
		alignSelf: 'center', 
		backgroundColor: '#519FE2', 
		borderRadius: 5
	},
	highlightBlue: {
		fontWeight: '700',
		color: '#519FE2'
	},
	highlightBlack: {
		fontWeight: '700',
		color: 'black'
	}
})