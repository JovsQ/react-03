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

export default class SuccessfulDropOffScreen extends Component {

	componentDidMount() {
		Orientation.lockToLandscape();
	}

	render() {

		const { navigation } = this.props;

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
							<Text style={dropOffStyles.rightLabelText}>Locker <Text style={dropOffStyles.highlightBlue}>No. 12</Text></Text>
							<Text style={dropOffStyles.rightLabelText}>has been assigned</Text>
							<Text style={dropOffStyles.rightLabelText}>to <Text style={dropOffStyles.highlightBlue}>09950815097</Text></Text>
						</View>
						<View style={dropOffStyles.exitButton}>
							<Button title="Go back to Locker List" style={{fontSize: 18}} onPress={() => navigation.navigate('PickupLocker')}/>	
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
	exitButton: {
		flex: 1,
		width: '70%',
		alignSelf: 'center',
		justifyContent:'center'
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