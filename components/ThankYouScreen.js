import React, { Component } from 'React';
import Orientaion from 'react-native-orientation';
import {
	Image,
	ImageBackground,
	StyleSheet,
	Text,
	View
} from 'react-native';

import appBG from '../images/app_bg.png';
import check from '../images/check_circle.png';

export default class ThankYouScreens extends Component {

	componentDidMount() {
		Orientaion.lockToLandscape();
	}

	render() {

		const { navigation } = this.props;

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
							<Text style={openLockerStyles.rightLabelText}>Thank you for trusting</Text>
							<Text style={openLockerStyles.rightLabelText}>our services!</Text>
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
		justifyContent: 'center',
		alignItems: 'center'
	},
	rightLabel: {
		flex: 2,
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
		flex: 2,
		width: '70%',
		alignSelf: 'center',
		justifyContent: 'center'
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