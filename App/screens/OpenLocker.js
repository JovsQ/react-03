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


import appBG from '../assets/app_bg.png';
import check from '../assets/check_circle.png';
import phone from '../assets/phone.png';

export default class OpenLockerScreen extends Component {
	componentDidMount() {
		Orientation.lockToLandscape();
	}

	render() {
		const { navigation } = this.props;

		const phoneNumber = this.props.navigation.getParam('phoneNumber', '');
		const size = this.props.navigation.getParam('size', '');
		const price = this.props.navigation.getParam('price', ''); 
		const locker = this.props.navigation.getParam('locker', '');

		return (
			<ImageBackground source={appBG} style={openLockerStyles.container} alt='bg'>
				<View style={openLockerStyles.card}>
					<View style={openLockerStyles.leftContainer}>
						<Image source={check} alt='check_circle' style={openLockerStyles.check}/>
						<Text style={openLockerStyles.leftText}>Locker</Text>
						<Text style={openLockerStyles.leftText}>Successfully</Text>
						<Text style={[openLockerStyles.leftText, openLockerStyles.bold]}>Opened!</Text>
					</View>
					<View style={openLockerStyles.line}>
						<Text></Text>
					</View>
					<View style={openLockerStyles.rightContainer}>
						<View style={openLockerStyles.rightLabel}>
							<Text style={openLockerStyles.rightLabelText}>Please proceed</Text>
							<Text style={openLockerStyles.rightLabelText}>to locker <Text style={openLockerStyles.highlightBlue}>No. {locker}</Text></Text>
						</View>
						<View style={openLockerStyles.rightDetails}>
							<Text style={openLockerStyles.rightLabelText}>For <Text style={openLockerStyles.highlightBlack}>Drop Off</Text></Text>
							<Text style={openLockerStyles.rightLabelText}>{size} - <Text style={openLockerStyles.highlightBlue}>P{price}.00</Text></Text>
							<Text style={openLockerStyles.rightLabelText}><Image source={phone} alt='phone' style={openLockerStyles.phone}/> {phoneNumber}</Text>
						</View>
						<View style={openLockerStyles.exitButtonContainer}>
							<TouchableOpacity style={openLockerStyles.exitButton} onPress={() => navigation.navigate('Home')}>
								<Text style={openLockerStyles.exitButtonLabel}>Exit</Text>
							</TouchableOpacity>
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
	bold: {
		fontWeight: '700',
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
		justifyContent: 'center'
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