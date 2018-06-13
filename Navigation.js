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
import appBG from './images/app_bg.png'

class HomeScreen extends Component {
	componentWillMount() {
		YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
	}
	componentDidMount() {
		Orientation.lockToLandscape();
	}

	render() {
		return (
			<ImageBackground source={appBG} alt="bg" style={{flex: 1, justifyContent: 'center'}}>
				<View style={{alignItems: 'center'}}>
					<Text>Enter Your Mobile Number</Text>
				</View>
				
				<PhoneInput />
				<View style={{alignItems: 'center'}}>
					<View style={{width: '30%'}}>
						<Button
						title="Enter"
						onPress={() =>
							this.props.navigation.navigate('SelectLocker')
						}/>
					</View>
				</View>
			</ImageBackground>
		)
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
	}
});
