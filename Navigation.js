import React, { Component } from 'react';
import {
	Alert,
	Button,
	Image,
	ImageBackground, 
	View,
	Text,
	TextInput,
	YellowBox 
} from 'react-native';
import { createStackNavigator, StackNavigator } from 'react-navigation';
import Orientation from 'react-native-orientation';

import SampleScreen from './App';
import LockerSelection from './LockerSelection';
import AsyncStorageHelper from './AsyncStorageHelper';
import PaymentScreen from './components/PaymentScreen';
import OpenLockerScreen from './components/OpenLockerScreen';
import EnterPinScreen from './components/EnterPinScreen';
import ThankYouScreen from './components/ThankYouScreen';
import ServiceSelectScreen from './components/ServiceSelectScreen.js';

import appBG from './images/app_bg.png'

class HomeScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			text: ''
		}
	}

	componentDidMount() {
		Orientation.lockToLandscape();
	}

	onChanged(event) {
		this.setState({text: event.target.value});
	}

	validateNumber() {
		if (this.state.text === '09123456789') {	
			this.props.navigation.navigate('EnterPin', {
              	phoneNumber: this.state.text,
            })
            this.setState({text: ''});
            this.textInput.clear();
		} else if (this.state.text.length === 11) {
			this.props.navigation.navigate('SelectLocker', {
              	phoneNumber: this.state.text,
            })
            this.setState({text: ''});
            this.textInput.clear();
		} else {

		}
		
	}

	render() {
	    return (
	      <ImageBackground source={appBG} alt="bg" style={{flex: 1, justifyContent: 'center', paddingBottom: 48}}>

	        <View style={{height: '50%', justifyContent: 'space-between'}}>
	          <View style={{alignItems: 'center'}}>
	            <Text style={{fontSize: 18}}>Enter Your Mobile Number</Text>
	          </View>
	          
	          <View style={{alignItems: 'center'}}>
	            <View style={{width: '50%', backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-around', paddingLeft: 30, paddingRight: 30, borderRadius: 10, elevation: 2}}>

	              <TextInput ref={input => { this.textInput = input }} style={{fontSize: 28, textAlign: 'center', width: '100%'}} maxLength={11} underlineColorAndroid='rgba(0,0,0,0)' keyboardType='numeric' onChangeText={(text) => this.setState({text})}/>
	              
	            </View>
	          </View>

	          <View style={{alignItems: 'center'}}>
	            <View style={{width: '30%'}}>
	              <Button
	              title="Enter"
	              style={{fontSize: 18, backgroundColor: '#519FE2'}}
	              onPress={() =>
	                this.validateNumber()
	              }/>
	            </View>
	          </View>

	        </View>
	      </ImageBackground>
	    );
	  }	
	componentWillUnmount() {

	}
}

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
	}
});
