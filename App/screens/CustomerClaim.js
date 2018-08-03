import React, { Component } from 'React';
import Orientaion from 'react-native-orientation';
import {
	Alert,
	AsyncStorage,
	Image,
	ImageBackground,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native';

import appBG from '../assets/app_bg.png';
import check from '../assets/check_circle.png';

import { appKey } from '../helpers/Constants';

export default class ThankYouScreens extends Component {

	constructor(props) {
		super(props);
		this.state = {
			allAccounts: []
		}
	}

	componentDidMount() {
		Orientaion.lockToLandscape();
		this.getAllAccounts();
	}

	getAllAccounts() {
		AsyncStorage.getItem(appKey)
		.then((value) => {
			var account = JSON.parse(value);

			if (account) {
				this.setState({ allAccounts : account });
			}
		})
		.catch((error) => {
			Alert.alert(`${error}`);
		})
	}

	removeFromAccount(phoneNumber, locker) {
		var remainingAccounts = [];
		var allAccounts = this.state.allAccounts;
		for (a in allAccounts) {
			if (allAccounts[a].phoneNumber == phoneNumber && allAccounts[a].locker == locker && allAccounts[a].status == 'clean') {

			} else {
				remainingAccounts.push(allAccounts[a]);
			}
		}

		AsyncStorage.setItem(appKey, JSON.stringify(remainingAccounts))
		.then((value) => {
			this.props.navigation.navigate('Home');
		})
	}

	render() {

		const { navigation } = this.props;
		const phoneNumber = this.props.navigation.getParam('phoneNumber', '0');
		const locker = this.props.navigation.getParam('locker', '0');

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
							<Text style={openLockerStyles.rightLabelText}>to locker <Text style={openLockerStyles.highlightBlue}>No. {locker}</Text></Text>
						</View>
						<View style={openLockerStyles.rightDetails}>
							<Text style={openLockerStyles.rightLabelText}> Thank you for trusting</Text>
							<Text style={openLockerStyles.rightLabelText}>our services!</Text>
						</View>
						<View style={openLockerStyles.exitButtonContainer}>
							<TouchableOpacity style={openLockerStyles.exitButton} onPress={() => this.removeFromAccount(phoneNumber, locker)}>
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
	}
})