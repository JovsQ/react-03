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
import insertCash from '../images/insert_cash.png';

export default class PaymentScreen extends Component {

	componentDidMount() {
		Orientation.lockToLandscape();
	}

	render() {
		const { navigation } = this.props;
		const itemId = navigation.getParam('itemId', 'no-id');
		const otherParam = navigation.getParam('otherParam', 'default value'); 

		return (
			<ImageBackground source={appBG} style={paymentStyles.container} alt='bg'>
				<View style={{width: '60%', backgroundColor: 'white', borderRadius: 10, justifyContent: 'center', padding: 30, elevation: 2}}>
          			<Image source={insertCash} style={paymentStyles.paymentImage} alt="insert_cash"/>
					<View style={{flex: 5, justifyContent: 'center'}}>
						<Text style={paymentStyles.amount}>P600.00</Text>
          				<Text style={paymentStyles.amountLabel}>Please Insert Payment</Text>
					</View>
				</View>
				
				<View style={{width: '35%', backgroundColor: 'white', borderRadius: 10, justifyContent: 'center', elevation: 2}}>
					<View style={{flex: 5, width: '100%' , justifyContent: 'center'}}>
          				<Text style={paymentStyles.amountLabel}>Amount Inserted</Text>
          				<Text style={paymentStyles.amount}>P0.00</Text>
          				<View style={paymentStyles.temporaryButton}>
          					<Button title="P20" style={{fontSize: 14, backgroundColor: '#519FE2'}} onPress={() => navigation.navigate('OpenLocker')}/>	
          				</View>
          				<View style={paymentStyles.temporaryButton}>
          					<Button title="P50" style={{fontSize: 14, backgroundColor: '#519FE2'}} onPress={() => navigation.navigate('OpenLocker')}/>	
          				</View>
          				<View style={paymentStyles.temporaryButton}>
          					<Button title="P100" style={{fontSize: 14, backgroundColor: '#519FE2'}} onPress={() => navigation.navigate('OpenLocker')}/>	
          				</View>
          				<View style={paymentStyles.temporaryButton}>
          					<Button title="P500" style={{fontSize: 14, backgroundColor: '#519FE2'}} onPress={() => navigation.navigate('OpenLocker')}/>	
          				</View>
          				<View style={paymentStyles.temporaryButton}>
          					<Button title="P1000" style={{fontSize: 14, backgroundColor: '#519FE2'}} onPress={() => navigation.navigate('OpenLocker')}/>	
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
		fontWeight: 'bold',
		fontSize: 20,
		textAlign: 'center'
	},
	amount: {
		fontWeight: 'bold',
		fontSize: 24,
		textAlign: 'center',
		color: '#519FE2'
	},
	temporaryButton: {
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 1,
		paddingBottom: 1,
		width:'100%', 
		justifyContent: 'center'
	}

});
