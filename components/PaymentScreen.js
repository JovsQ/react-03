import React, { Component } from 'react';
import Orientation from 'react-native-orientation';
import {
	Alert,
	AsyncStorage,
	Button,
	Image,
	ImageBackground,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
	} from 'react-native';

import appBG from '../images/app_bg.png';
import insertCash from '../images/insert_cash.png';

const SMART_LOCKER_KEY = 'SMART LOCKER KEY';

export default class PaymentScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			amount: '0'
		}
	}

	componentDidMount() {
		Orientation.lockToLandscape();
	}

	insertPayement(insertAmount) {

		var currentPayment = parseInt(this.state.amount, 10);

		const phoneNumber = this.props.navigation.getParam('phoneNumber', '0');
		const size = this.props.navigation.getParam('size', 'no size');
		const locker = this.props.navigation.getParam('locker', '0');
		const price = parseInt(this.props.navigation.getParam('price', '0'), 10);
		const status = 'pickup';
		const code = Math.floor(100000 + Math.random() * 900000).toString();

		if (currentPayment < price) {
			currentPayment += insertAmount;
			this.setState({
				amount: currentPayment.toString()
			})


			if (currentPayment >= price) {
				var account = {
					phoneNumber: phoneNumber,
					size: size,
					locker: locker,
					status: status
					code: code
				}

				AsyncStorage.getItem(SMART_LOCKER_KEY).then((value) => {
					var accounts = JSON.parse(value);

					if (!accounts) {
						accounts = [];
					}

					accounts.push(account);

					AsyncStorage.setItem(SMART_LOCKER_KEY, JSON.stringify(accounts))
					.then((value) => {
						if (currentPayment == price) {
							Alert.alert(`Thank you for giving the exact amount`);
						} else {
							Alert.alert(`Your change is P${currentPayment - price}.00`);
						}
						this.props.navigation.navigate('OpenLocker', {
							phoneNumber: phoneNumber, 
							size: size, 
							price: price,
							locker: locker
						});
					})
				})
			}
		}
		
	}

	render() {
		const { navigation } = this.props;
		const itemId = navigation.getParam('itemId', 'no-id');
		const otherParam = navigation.getParam('otherParam', 'default value');

		const phoneNumber = this.props.navigation.getParam('phoneNumber', '0');
		const size = this.props.navigation.getParam('size', 'no size');
		const price = this.props.navigation.getParam('price', '0'); 

		return (
			<ImageBackground source={appBG} style={paymentStyles.container} alt='bg'>
				<View style={{width: '60%', backgroundColor: 'white', borderRadius: 10, justifyContent: 'center', padding: 30, elevation: 2}}>
          			<Image source={insertCash} style={paymentStyles.paymentImage} alt="insert_cash"/>
					<View style={{flex: 5, justifyContent: 'center'}}>
						<Text style={paymentStyles.amount}>P{price}</Text>
          				<Text style={paymentStyles.amountLabel}>Please Insert Payment</Text>
					</View>
				</View>
				
				<View style={{width: '35%', backgroundColor: 'white', borderRadius: 10, justifyContent: 'center', elevation: 2}}>
					<View style={{flex: 5, width: '100%' , justifyContent: 'center', padding: 10}}>
          				<Text style={paymentStyles.amountLabel}>Amount Inserted</Text>
          				<Text style={paymentStyles.amount}>P{this.state.amount}.00</Text>
          				<View style={paymentStyles.temporaryButtonContainer}>
							<TouchableOpacity style={paymentStyles.temporaryButton} onPress={() => this.insertPayement(20)}>
								<Text style={paymentStyles.temporaryButtonLabel}>P20</Text>
							</TouchableOpacity>
						</View>
						<View style={paymentStyles.temporaryButtonContainer}>
							<TouchableOpacity style={paymentStyles.temporaryButton} onPress={() => this.insertPayement(50)}>
								<Text style={paymentStyles.temporaryButtonLabel}>P50</Text>
							</TouchableOpacity>
						</View>
						<View style={paymentStyles.temporaryButtonContainer}>
							<TouchableOpacity style={paymentStyles.temporaryButton} onPress={() => this.insertPayement(100)}>
								<Text style={paymentStyles.temporaryButtonLabel}>P100</Text>
							</TouchableOpacity>
						</View>
						<View style={paymentStyles.temporaryButtonContainer}>
							<TouchableOpacity style={paymentStyles.temporaryButton} onPress={() => this.insertPayement(200)}>
								<Text style={paymentStyles.temporaryButtonLabel}>P200</Text>
							</TouchableOpacity>
						</View>
						<View style={paymentStyles.temporaryButtonContainer}>
							<TouchableOpacity style={paymentStyles.temporaryButton} onPress={() => this.insertPayement(500)}>
								<Text style={paymentStyles.temporaryButtonLabel}>P500</Text>
							</TouchableOpacity>
						</View>
						<View style={paymentStyles.temporaryButtonContainer}>
							<TouchableOpacity style={paymentStyles.temporaryButton} onPress={() => this.insertPayement(1000)}>
								<Text style={paymentStyles.temporaryButtonLabel}>P1000</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
				
			</ImageBackground>
		);
	}
}

const paymentStyles = StyleSheet.create({
	container: {
	    padding: 30,
	    flex: 1,
	    width: '100%',
	    flexDirection: 'row',
	    alignItems: 'stretch',
	    justifyContent: 'space-between',
	    alignItems: 'center'
	},
	paymentImage: {
	 	flex: 4,
	 	padding: 20,
	 	aspectRatio: 1.5,
	 	resizeMode: 'contain',
	 	alignSelf: 'center'
	},
	amountLabel: {
		flex: 1,
		fontWeight: 'bold',
		fontSize: 20,
		textAlign: 'center'
	},
	amount: {
		flex: 1,
		fontWeight: 'bold',
		fontSize: 24,
		textAlign: 'center',
		color: '#519FE2'
	},
	temporaryButtonContainer: {
		width: '100%',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	temporaryButton: {
		width:'70%',
		height: 25, 
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 2,
		backgroundColor: '#519FE2',
		borderRadius: 5
	},
	temporaryButtonLabel: {
		fontSize: 14,
		color: 'white',
		textAlign: 'center'
	}


});
