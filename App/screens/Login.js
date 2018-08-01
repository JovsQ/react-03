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
import Orientation from 'react-native-orientation';
import Modal from 'react-native-modal';

//assets
import appBG from '../assets/app_bg.png';
import { appKey, adminNumber } from '../helpers/Constants';

export default class HomeScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			text: ''
		}
	}

	componentWillMount() {
		Orientation.lockToLandscape();
	}

	onChanged(event) {
		this.setState({text: event.target.value});
	}

	validateNumber(phoneNumber) {

		if (phoneNumber == adminNumber) {
			this.requirePin(phoneNumber);
		} else if (phoneNumber.length == 11) {

			AsyncStorage.getItem(appKey).then((value) => {
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

	render() {
	    return (
	      	<ImageBackground source={appBG} alt="bg" style={ homeStyles.container }>

		        <View style={ homeStyles.childContainer }>
		          	<View style={{alignItems: 'center'}}>
		            	<Text style={{fontSize: 18}}>Enter Your Mobile Number</Text>
		          	</View>
		          
		          	<View style={{alignItems: 'center'}}>
		            	<View style={ homeStyles.inputContainer }>
		              		<TextInput 
		              		ref={input => { this.textInput = input }} 
		              		style={ homeStyles.inputStyle } 
		              		maxLength={11} 
		              		underlineColorAndroid='rgba(0,0,0,0)' 
		              		keyboardType='numeric' 
		              		onChangeText={(text) => this.setState({text})}/>
		              	</View>
		          	</View>

		          	<View style={{alignItems: 'center'}}>
		            	<TouchableOpacity style={ homeStyles.buttonContainer }
		            	onPress={() => this.validateNumber(this.state.text)}>
		            		<Text style={homeStyles.buttonText}>Enter</Text>
		            	</TouchableOpacity>
		          	</View>

		        </View>

		    </ImageBackground>
	    );
	}
}

const homeStyles = StyleSheet.create({
	container: {
		flex: 1, 
		justifyContent: 'center', 
		paddingBottom: 48
	},
	childContainer: {
		height: '60%', 
		justifyContent: 'space-between'
	},
	inputContainer: {
		width: '50%', 
		backgroundColor: 'white', 
		flexDirection: 'row', 
		justifyContent: 'space-around', 
		paddingLeft: 30, 
		paddingRight: 30, 
		borderRadius: 10, 
		elevation: 2
	},
	inputStyle: {
		fontSize: 28, 
		textAlign: 'center', 
		width: '100%'
	},
	buttonContainer: {
		width: '30%', 
		backgroundColor: '#519FE2', 
		height: 40, 
		borderRadius: 5, 
		justifyContent: 'center', 
		alignItems: 'center', 
		elevation: 2
	},
	buttonText: {
		fontSize: 18, 
		color: 'white'
	}
});
