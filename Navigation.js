import React, { Component } from 'react';
import {
	Alert,
	AsyncStorage,
	Button,
	Image,
	ImageBackground,
	View,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	YellowBox 
} from 'react-native';
import { createStackNavigator, StackNavigator } from 'react-navigation';
import Orientation from 'react-native-orientation';
import Modal from 'react-native-modal';
import SmsAndroid from 'react-native-sms-android';

//screens
import SampleScreen from './App';
import LockerSelection from './LockerSelection';
import AsyncStorageHelper from './AsyncStorageHelper';
import PaymentScreen from './components/PaymentScreen';
import OpenLockerScreen from './components/OpenLockerScreen';
import EnterPinScreen from './components/EnterPinScreen';
import ThankYouScreen from './components/ThankYouScreen';
import ServiceSelectScreen from './components/ServiceSelectScreen.js';
import PickupLockerScreen from './components/PickupLockerScreen.js';
import SuccessfulPickupScreen from './components/SuccessfulPickupScreen.js';
import DropOffLockerScreen from './components/DropOffLockerScreen.js';
import SuccessfulDropOffScreen from './components/SuccessfulDropOffScreen.js';

//assets
import appBG from './images/app_bg.png';

//components
import { ConfirmationModal } from './App/components/Modal'

const SMART_LOCKER_KEY = 'SMART LOCKER KEY';

var allAcounts = [];

class HomeScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			text: '',
			modalVisible: false
		}
	}

	componentWillMount() {
		// Alert.alert('Component did mount');
		Orientation.lockToLandscape();
		// this.getAllAccounts();
	}

	getAllAccounts() {
		AsyncStorage.getItem(SMART_LOCKER_KEY)
		.then((value) => {
			var accounts = JSON.parse(value);
			
			if (accounts) {
				allAcounts = accounts;
			}
		})
		.catch((error) => {
			Alert.alert(`${error.message}`);
		})
	}

	async getStorageValue(key) {
		var value = await AsyncStorage.getItem(key);
		if (value) {
			this.setState({text: value});	
		}		
	}

	onChanged(event) {

		this.setState({text: event.target.value});
	}

	validateNumber(phoneNumber) {

		const temporaryDefaultNumber = '09123456789';

		if (phoneNumber == '09123456789') {
			//send admin code
			this.requirePin(phoneNumber);
		} else if (phoneNumber.length == 11) {
			// if (allAcounts.length > 0) {
			// 	var account;
			// 	for (a in allAcounts) {
			// 		if (allAcounts[a].phoneNumber == phoneNumber && allAcounts[a].status == 'clean') {
			// 			account = allAcounts[a];
			// 		}
			// 	}

			// 	if (account) {
			// 		this.requirePin(phoneNumber);
			// 	} else {
			// 		this.selectLocker(phoneNumber);
			// 	}
			// } else {
			// 	this.selectLocker(phoneNumber);
			// }


			AsyncStorage.getItem(SMART_LOCKER_KEY).then((value) => {
				var accounts = JSON.parse(value);

				if (accounts) {
					var account;
					for (a in accounts) {
						if (accounts[a].phoneNumber == phoneNumber && accounts[a].status == 'clean') {
							account = accounts[a];
						}
					}

					if (account) {
						this.requirePin(phoneNumber);
					} else {
						this.selectLocker(phoneNumber);
					}
				} else {
					this.selectLocker(phoneNumber);
				}
			})
		}		
		this.setState({text: ''});
		this.textInput.clear();
	}

	sendCode(phoneNumber, code) {
		SmsAndroid.sms(
			phoneNumber,
			code,
			'sendDirect',
			(err, message) => {
				if (err) {
					Alert.alert(`${err}`);
				} else {
					this.moveScreen(phoneNumber, 'EnterPin');
				}
			});
	}

	selectLocker(phoneNumber) {
		this.props.navigation.navigate('SelectLocker', {
			phoneNumber: phoneNumber
		})
	}

	requirePin(phoneNumber) {
		this.props.navigation.navigate('EnterPin', {
			phoneNumber: phoneNumber
		})
	}

	randomNumberGenerator() {
		Alert.alert(Math.floor(100000 + Math.random() * 900000).toString());
	}

	modalContent() {
		return (
			<View style={navigationStyles.modalContent}>
				<Text>Hello World!</Text>
				{this.modalButton('09950815097', () => this.setState({ modalVisible: false }))}
			</View>
		)
	}

	modalButton(text, phoneNumber, onPress) {
		return (
			<TouchableOpacity onPress={onPress}>
				<View style={navigationStyles.button}>
					<Text style={navigationStyles.modalText}>to <Text style={navigationStyles.highlightBlue}>{phoneNumber}</Text></Text>
					<Text>{text}</Text>
					<Text>{text}</Text>
				</View>
			</TouchableOpacity>
		)
	}

	render() {
	    return (
	      <ImageBackground source={appBG} alt="bg" style={{flex: 1, justifyContent: 'center', paddingBottom: 48}}>

	        <View style={{height: '60%', justifyContent: 'space-between'}}>
	          <View style={{alignItems: 'center'}}>
	            <Text style={{fontSize: 18}}>Enter Your Mobile Number</Text>
	          </View>
	          
	          <View style={{alignItems: 'center'}}>
	            <View style={{width: '50%', backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-around', paddingLeft: 30, paddingRight: 30, borderRadius: 10, elevation: 2}}>

	              <TextInput ref={input => { this.textInput = input }} style={{fontSize: 28, textAlign: 'center', width: '100%'}} maxLength={11} underlineColorAndroid='rgba(0,0,0,0)' keyboardType='numeric' onChangeText={(text) => this.setState({text})}/>
	              
	            </View>
	          </View>

	          <View style={{alignItems: 'center'}}>
	            <TouchableOpacity style={{width: '30%', backgroundColor: '#519FE2', height: 40, borderRadius: 5, justifyContent: 'center', alignItems: 'center', elevation: 2}}
	            onPress={() => this.validateNumber(this.state.text)}>
	            	<Text style={navigationStyles.buttonText}>Enter</Text>
	            </TouchableOpacity>
	          </View>

	        </View>
	        <Modal isVisible={this.state.modalVisible}>
	        	<ConfirmationModal
	        		onConfirm={() => Alert.alert('Confirmed!')}
	        		onCancel={() => this.setState({ modalVisible: false })} />
	        </Modal>

	      </ImageBackground>
	    );
	  }	
	componentWillUnmount() {

	}
}

const navigationStyles = StyleSheet.create({
	button: {
	    backgroundColor: 'lightblue',
	    padding: 12,
	    margin: 16,
	    justifyContent: 'center',
	    alignItems: 'center',
	    borderRadius: 4,
	    borderColor: 'rgba(0, 0, 0, 0.1)',
	},
	modalContent: {
	    backgroundColor: 'white',
	    width: '70%',
	    height: '70%',
	    padding: 10,
	    justifyContent: 'space-evenly',
	    alignItems: 'center',
	    alignSelf: 'center',
	    borderRadius: 4,
	    borderColor: 'rgba(0, 0, 0, 0.1)',
	},
	modalText: {
		fontWeight: '400',
		fontSize: 18,
		textAlign: 'center',
		alignSelf: 'center'
	},
	highlightBlue: {
		fontWeight: '700',
		color: '#519FE2'
	},
	buttonText: {
		fontSize: 18, 
		color: 'white'
	},
	modalButton: {
		width: '40%',
		height: 40, 
		borderRadius: 5, 
		justifyContent: 'center', 
		alignItems: 'center', 
		elevation: 2
	},
	positiveColor: {
		backgroundColor: '#519FE2' 
	},
	negativeColor: {
		backgroundColor: 'gray'
	}
 
});

class PhoneInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: ''
		}
		this.onChanged = this.onChanged.bind(this);
	}
	onChanged(event) {
		this.setState({text: event.target.value});
	}
	render() {
		return (
			<View style={{alignItems: 'center'}}>
				<Text>{this.state.text}</Text>
				<View style={{width: '70%'}}>
					<TextInput
					maxLength={10}
					onChangeText={this.onChanged}
					value={this.state.text}	/>
				</View>
			</View>
		)
	}
}

class OkButton extends Component {
	render() {
		return (
			<View style={{alignItems: 'center'}}>
				<View style={{width: '30%'}}>
					<Button
					title="Enter"
					onPress={() =>
						this.props.navigation.navigate('Samples')
					}/>
				</View>
			</View>
		)
	}
}

export default createStackNavigator({
	Home: { 
		screen: HomeScreen,
		navigationOptions: {
            header: null
        } 
    },
	Samples: { 
		screen: SampleScreen,
		navigationOptions: {
			header: null
		}
	},
	SelectLocker: {
		screen: LockerSelection,
		navigationOptions: {
			header: null
		}
	},
	SampleStorage: {
		screen: AsyncStorageHelper,
		navigationOptions: {
			header: null
		}
	},
	Payment: {
		screen: PaymentScreen,
		navigationOptions: {
			header: null
		}
	},
	OpenLocker: {
		screen: OpenLockerScreen,
		navigationOptions: {
			header: null
		}
	},
	EnterPin: {
		screen: EnterPinScreen,
		navigationOptions: {
			header: null
		}
	},
	ThankYou: {
		screen: ThankYouScreen,
		navigationOptions: {
			header: null
		}
	},
	ServiceSelect: {
		screen: ServiceSelectScreen,
		navigationOptions: {
			header: null
		}
	},
	PickupLocker: {
		screen: PickupLockerScreen,
		navigationOptions: {
			header: null
		}
	},
	SuccessfulPickup: {
		screen: SuccessfulPickupScreen,
		navigationOptions: {
			header: null
		}
	},
	DropOffLocker: {
		screen: DropOffLockerScreen,
		navigationOptions: {
			header: null
		}
	},
	SuccessfulDropOff: {
		screen: SuccessfulDropOffScreen,
		navigationOptions: {
			header: null
		}
	}
});
