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

import SampleScreen from './App'
import LockerSelection from './LockerSelection'
import AsyncStorageHelper from './AsyncStorageHelper'
import PaymentScreen from './components/PaymentScreen'

import appBG from './images/app_bg.png'

class HomeScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			text: ''
		}
	}

	componentWillMount() {
		YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
	}
	componentDidMount() {
		Orientation.lockToLandscape();
	}

	onChanged(event) {
		this.setState({text: event.target.value});
	}

	render() {
	    return (
	      <ImageBackground source={appBG} alt="bg" style={{flex: 1, justifyContent: 'center', paddingBottom: 48}}>

	        <View style={{height: '50%', justifyContent: 'space-between'}}>
	          <View style={{alignItems: 'center'}}>
	            <Text style={{fontSize: 18}}>Enter Your Mobile Number</Text>
	          </View>
	          
	          <View style={{alignItems: 'center'}}>
	            <View style={{width: '50%', backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-around', paddingLeft: 30, paddingRight: 30}}>

	              <Text style={{fontSize: 28, color: 'lightgray', width: '22%', textAlign: 'center'}}>+63</Text>

	              <Text style={{fontSize: 28, color: 'black', width: '22%', textAlign: 'center'}}>995</Text>

	              <Text style={{fontSize: 28, color: 'black', width: '22%', textAlign: 'center'}}>081</Text>

	              <Text style={{fontSize: 28, color: 'black', width: '30%', textAlign: 'center'}}>5097</Text>

	              
	            </View>
	          </View>

	          <View style={{alignItems: 'center'}}>
	            <View style={{width: '30%'}}>
	              <Button
	              title="Enter"
	              style={{fontSize: 18, backgroundColor: '#1589FF'}}
	              onPress={() =>
	                this.props.navigation.navigate('SelectLocker', {
	                  itemId: 86,
	                  otherParam: this.state.text,
	                })
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
	}
});
