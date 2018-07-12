import React, { Component } from 'react';
import Orientation from 'react-native-orientation';
import {
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

export default class PaymentScreen extends Component {

	componentDidMount() {
		Orientation.lockToLandscape();
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
          				<Text style={paymentStyles.amount}>P0.00</Text>
          				<View style={paymentStyles.temporaryButtonContainer}>
							<TouchableOpacity style={paymentStyles.temporaryButton} onPress={() => navigation.navigate('OpenLocker')}>
								<Text style={paymentStyles.temporaryButtonLabel}>P20</Text>
							</TouchableOpacity>
						</View>
						<View style={paymentStyles.temporaryButtonContainer}>
							<TouchableOpacity style={paymentStyles.temporaryButton} onPress={() => navigation.navigate('OpenLocker')}>
								<Text style={paymentStyles.temporaryButtonLabel}>P50</Text>
							</TouchableOpacity>
						</View>
						<View style={paymentStyles.temporaryButtonContainer}>
							<TouchableOpacity style={paymentStyles.temporaryButton} onPress={() => navigation.navigate('OpenLocker')}>
								<Text style={paymentStyles.temporaryButtonLabel}>P100</Text>
							</TouchableOpacity>
						</View>
						<View style={paymentStyles.temporaryButtonContainer}>
							<TouchableOpacity style={paymentStyles.temporaryButton} onPress={() => navigation.navigate('OpenLocker')}>
								<Text style={paymentStyles.temporaryButtonLabel}>P200</Text>
							</TouchableOpacity>
						</View>
						<View style={paymentStyles.temporaryButtonContainer}>
							<TouchableOpacity style={paymentStyles.temporaryButton} onPress={() => navigation.navigate('OpenLocker')}>
								<Text style={paymentStyles.temporaryButtonLabel}>P500</Text>
							</TouchableOpacity>
						</View>
						<View style={paymentStyles.temporaryButtonContainer}>
							<TouchableOpacity style={paymentStyles.temporaryButton} onPress={() => navigation.navigate('OpenLocker')}>
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
