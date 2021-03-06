import React, { Component } from 'react';
import Orientation from 'react-native-orientation';
import {
	AsyncStorage,
	Image,
	ImageBackground,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native';
import SmsAndroid from 'react-native-sms-android';

import appBG from '../assets/app_bg.png';
import arrowLeft from '../assets/arrow_left.png';

import { appKey, adminNumber } from '../helpers/Constants';
import { generateRandomCode } from '../helpers/Utils';

export default class EnterPinScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			text: '------',
			code: '',
			currentCode: '',
			phoneNumber: '',
			allAccounts: []
		}
	}

	componentDidMount() {
		Orientation.lockToLandscape();
		phoneNumber = this.props.navigation.getParam('phoneNumber', '0');
		this.setState({phoneNumber: phoneNumber});
		if (phoneNumber == adminNumber) {
			this.sendAdminPin();
		}
		this.getAccounts();
	}

	sendAdminPin() {
		currentCode = generateRandomCode();
		this.sendCode(phoneNumber, currentCode);
	}

	getAccounts() {
		allAccounts = [];
		AsyncStorage.getItem(appKey)
		.then((value) => {

			var accounts = JSON.parse(value);

			if (accounts) {
				this.state.allAccounts = accounts;
			}
		})
		.catch((error) => {
			Alert.alert(`${error.message}`);
		})
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
				}
			});
	}

	resendPin() {
		if (phoneNumber == adminNumber) {
			this.sendAdminPin();
		} else if (this.state.allAccounts.length > 0) {
			const allAccounts = this.state.allAccounts;
			var account;
			for (a in allAccounts) {
				if (allAccounts[a].phoneNumber == phoneNumber && allAccounts[a].status == 'clean') {
					account = allAccounts[a];
				}
			}

			if (account) {
				this.sendCode(account.phoneNumber, account.code);
			}
		}
	}

	validatePin() {
		this.props.navigation.navigate('ThankYou');
	}

	enterPin(number) {
		var tempCode = this.state.code;
		if (number != 'delete') {
			if (tempCode == '') {
				tempCode = number;
			} else if (tempCode.length < 6) {
				tempCode = tempCode + number;
			}
		} else {
			if (tempCode != '') {
				tempCode = tempCode.substring(0, tempCode.length - 1);
			}
		}

		if (tempCode.length == 6) {
			if (this.state.phoneNumber == adminNumber && currentCode == tempCode) {
				this.setState({text: '------', code: ''});
				this.props.navigation.navigate('ServiceSelect');
			} else {
				const allAccounts = this.state.allAccounts;
				var exist = false;
				for (a in this.state.allAccounts) {
					if (allAccounts[a].phoneNumber == this.state.phoneNumber && allAccounts[a].code == tempCode) {
						exist = true;
						this.props.navigation.navigate('ThankYou', {
							phoneNumber: allAccounts[a].phoneNumber,
							locker: allAccounts[a].locker
						})
					}
				}

				if (!exist) {
					this.setState({text: '------', code: ''});					
				}
			}
		} else {
			this.setState({code: tempCode})
			for (let i = 0; i < 6; i++) {
				if (tempCode.length < i + 1) {
					tempCode = tempCode + '-';
				}
			}
			this.setState({text: tempCode});
		}
	}

	render() {
		const { navigation } = this.props;

		return (
			<ImageBackground source={appBG} style={pinStyles.container} alt='bg'>
				<View style={pinStyles.navHeader}>
	            	<View style={pinStyles.headerButtonLeft}>
	            		<TouchableOpacity style={pinStyles.backButtonContainer} onPress={() => navigation.navigate('Home')}>
	            			<Image source={arrowLeft} alt="arrow_left" style={pinStyles.backButton}/>
	            		</TouchableOpacity>	            		
	            		<View style={pinStyles.leftSpace}/>
	            	</View>
	            	<View style={pinStyles.headerTextContainer}>
	            		<View style={pinStyles.mainCard}>
		          			<View style={pinStyles.headerLabel}>
		          				<Text style={pinStyles.headerText}>Please enter PIN we sent to your</Text>
		          				<Text style={pinStyles.headerText}>mobile number to open locker</Text>
		          			</View>
		          			<Text style={pinStyles.input}>{this.state.text}</Text>
		          			<View style={pinStyles.numpad}>
		          				<View style={pinStyles.numpadRow}>
			                        <TouchableOpacity style={pinStyles.numpadButton} onPress={() => this.enterPin('1')}>
			                         	<Text style={pinStyles.numpadLabel}>1</Text>
			                        </TouchableOpacity>
			                        <TouchableOpacity style={pinStyles.numpadButton} onPress={() => this.enterPin('2')}>
			                          	<Text style={pinStyles.numpadLabel}>2</Text>
			                        </TouchableOpacity>
			                        <TouchableOpacity style={pinStyles.numpadButton} onPress={() => this.enterPin('3')}>
			                          	<Text style={pinStyles.numpadLabel}>3</Text>
			                        </TouchableOpacity>                       
			                    </View>
			                    <View style={pinStyles.numpadRow}>
			                        <TouchableOpacity style={pinStyles.numpadButton} onPress={() => this.enterPin('4')}>
			                          	<Text style={pinStyles.numpadLabel}>4</Text>
			                        </TouchableOpacity>
			                        <TouchableOpacity style={pinStyles.numpadButton} onPress={() => this.enterPin('5')}>
			                          	<Text style={pinStyles.numpadLabel}>5</Text>
			                        </TouchableOpacity>
			                        <TouchableOpacity style={pinStyles.numpadButton} onPress={() => this.enterPin('6')}>
			                          	<Text style={pinStyles.numpadLabel}>6</Text>
			                        </TouchableOpacity>
			                    </View>
			                    <View style={pinStyles.numpadRow}>
			                        <TouchableOpacity style={pinStyles.numpadButton} onPress={() => this.enterPin('7')}>
			                          	<Text style={pinStyles.numpadLabel}>7</Text>
			                        </TouchableOpacity>
			                        <TouchableOpacity style={pinStyles.numpadButton} onPress={() => this.enterPin('8')}>
			                          	<Text style={pinStyles.numpadLabel}>8</Text>
			                        </TouchableOpacity>
			                        <TouchableOpacity style={pinStyles.numpadButton} onPress={() => this.enterPin('9')}>
			                          	<Text style={pinStyles.numpadLabel}>9</Text>
			                        </TouchableOpacity>
			                    </View>
			                    <View style={pinStyles.numpadRow}>
			                        <TouchableOpacity style={pinStyles.numpadButton} onPress={() => this.enterPin('0')}>
			                          	<Text style={pinStyles.numpadLabel}>0</Text>
			                        </TouchableOpacity>
			                        <TouchableOpacity style={pinStyles.numpadDeleteButton} onPress={() => this.enterPin('delete')}>
			                          	<Text style={pinStyles.numpadLabel}>Delete</Text>
			                        </TouchableOpacity>
			                    </View>
		          			</View>
		          			<View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
		          				<Text style={pinStyles.footerLabel}>If you did not receive a pin. </Text> 
			          			<TouchableOpacity onPress={() => this.resendPin()} style={{justifyContent: 'center'}}>
			          				<Text style={pinStyles.highlightBlack}>Click Here</Text>
			          			</TouchableOpacity>
		          			</View>

		          					          			
		          		</View>
	            	</View>
	            	<View style={pinStyles.headerButtonRight}></View>
	          	</View>
	          	
			</ImageBackground>
		)
	}
}

const pinStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }, 
  navHeader: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  headerButtonLeft: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerButtonRight: {
    flex: 2
  },
  headerTextContainer: {
    flex: 6,
    justifyContent: 'center',
    width: '100%',
    padding: 20
  },
  backButtonContainer: {
    flex: 2,
    justifyContent: 'center'
  },
  backButton: {   
    width: 25,
    height: 25
  },
  numberButton:{
    alignSelf: 'center',
    width: 25,
    height: 25
  },
  leftSpace: {
    flex: 9
  },
  mainContent: {
    flex: 9,
    width: '100%',
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20
  },
  mainCard: {
    flex: 1,
    width: '100%',
    elevation: 2,
    alignSelf: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10
  },
  headerLabel: {
    flex: 1.5
  },
  headerText: {
    fontWeight: '400',
    fontSize: 18,
    textAlign: 'center'
  },
  footerLabel: {
    fontWeight: '400',
    fontSize: 16,
    textAlign: 'center',
    justifyContent: 'center'
  },
  highlightBlack: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '700',
    justifyContent: 'center'
  },
  input: {
    flex: 1,
    fontWeight: '700',
    fontSize: 20,
    textAlign: 'center'
  },
  numpad: {
    flex: 4
  },
  numpadRow: {
    flex: 1,
    width: '100%',
    marginTop: 2,
    marginBottom: 2,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  numpadButton: {
    width: '33%',
    justifyContent: 'center',
    elevation: 2,
    borderRadius: 5,
    alignItems: 'center'
  },
  numpadDeleteButton: {
    width: '66.3%',
    justifyContent: 'center',
    elevation: 2,
    borderRadius: 5,
    alignItems: 'center'
  },
  numpadLabel: {
    fontWeight: '400',
    fontSize: 18,
    textAlign: 'center',
    alignSelf: 'center'
  }
})