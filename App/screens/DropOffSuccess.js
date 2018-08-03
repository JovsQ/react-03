import React, { Component } from 'react';
import Orientation from 'react-native-orientation';
import {
	Image,
	ImageBackground,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native';
import SmsAndroid from 'react-native-sms-android';

import appBG from '../assets/app_bg.png';
import check from '../assets/check_circle.png';

export default class SuccessfulDropOffScreen extends Component {

	componentDidMount() {
		Orientation.lockToLandscape();
	}

	sendCodeToCustomer() {
		const phoneNumber = this.props.navigation.getParam('phoneNumber', '0');
		const locker = this.props.navigation.getParam('locker', '0');
		const code = this.props.navigation.getParam('code', '0');

		//temporary recepient for testing
		//replace recepient before deployment
		const tempRecepient = '09950815097'; 
		SmsAndroid.sms(
			tempRecepient,
			`phone number: ${phoneNumber} code: ${code}`,
			'sendDirect',
			(err, message) => {
				if (err) {
					Alert.aler(`${err}`)
				} else {
					this.props.navigation.navigate('DropOffLocker');
				}
			})
	}

	render() {

		const { navigation } = this.props;
		const locker = this.props.navigation.getParam('locker', '0');
		const phoneNumber = this.props.navigation.getParam('phoneNumber', '0');

		return (
			<ImageBackground source={appBG} style={dropOffStyles.container} alt='bg'>
				<View style={dropOffStyles.card}>
					<View style={dropOffStyles.leftContainer}>
						<Image source={check} alt='check_circle' style={dropOffStyles.check}/>
						<Text style={dropOffStyles.leftText}>Locker</Text>
						<Text style={dropOffStyles.leftText}>Successfully</Text>
						<Text style={dropOffStyles.leftTextBold}>Opened!</Text>
					</View>
					<View style={dropOffStyles.line}>
						<Text></Text>
					</View>
					<View style={dropOffStyles.rightContainer}>
						<View style={dropOffStyles.rightLabel}>
							<Text style={dropOffStyles.rightLabelText}>Locker <Text style={dropOffStyles.highlightBlue}>No. {locker}</Text></Text>
							<Text style={dropOffStyles.rightLabelText}>has been assigned</Text>
							<Text style={dropOffStyles.rightLabelText}>to <Text style={dropOffStyles.highlightBlue}>{phoneNumber}</Text></Text>
						</View>
						<View style={dropOffStyles.exitButtonContainer}>
							<TouchableOpacity style={dropOffStyles.exitButton} onPress={() => this.sendCodeToCustomer()}>
								<Text style={dropOffStyles.exitButtonLabel}>Go back to Locker List</Text>
							</TouchableOpacity>
						</View>
	  				</View>
				</View>
			</ImageBackground>
		)
	}
}

const dropOffStyles = StyleSheet.create({
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
		paddingBottom: 30,
		elevation: 2
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
		flex: 1,
		width: '70%',
		alignSelf: 'center',
		justifyContent: 'center'
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
	exitButtonContainer: {
		flex: 1,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	exitButton: {
		width: '70%',
		backgroundColor: '#519FE2',
		height: 40,
		borderRadius: 5, 
		elevation: 2,
		alignItems: 'center',
		justifyContent:'center'
	},
	exitButtonLabel: {
		fontSize: 18, 
		color: 'white',
		textAlign: 'center'
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