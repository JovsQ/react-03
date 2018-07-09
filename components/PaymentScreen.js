import React, { Component } from 'react';
import Orientation from 'react-native-orientation';
import { 
	AsyncStorage,
	Button,
	Image,
	ImageBackground,
	StyleSheet,
	Text,
	TextInput,
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
				<View style={{flex: 1, backgroundColor: 'white', width: '100%', borderRadius: 10, justifyContent: 'center', padding: 30, elevation: 2}}>
          			<Image source={insertCash} style={paymentStyles.paymentImage} alt="insert_cash"/>
					<View style={{flex: 5, justifyContent: 'center'}}>
						<Text style={paymentStyles.amount}>P600.00</Text>
          				<Text style={paymentStyles.amountLabel}>Please Insert Payment</Text>
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
	    alignItems: 'stretch',
	    backgroundColor: '#F5FCFF',
	    justifyContent: 'center',
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
		color: '#1589FF'
	}

});
