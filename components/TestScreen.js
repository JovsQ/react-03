import React, { Component } from 'react';
import Orientation from 'react-native-orientation';
import {
	Alert,
	AsyncStorage,
	Button,
	Text,
	TextInput,
	View,
} from 'react-native';


const sampleKey = 'SAMPLER';

export default class TestScreen extends Component {

	componentDidMount() {
		Orientation.lockToLandscape();
	}

	constructor(props) {
		super(props);
		this.state = {
			text: '',
			message: ''
		}
	}

	saveData(message) {
		if (message) {
			var newAccount = {
				phoneNumber: message,
			}

			AsyncStorage.getItem(sampleKey).then((value) => {
				var accounts = JSON.parse(value);
				if (!accounts) {
					accounts = [];
				}

				accounts.push(newAccount);

				AsyncStorage.setItem(sampleKey, JSON.stringify(accounts));
			})
		}
	}

	getData() {
		AsyncStorage.getItem(sampleKey).then((value) => {

			Alert.alert(value);
		});		
	}

	removeFromList(message) {
		if (message) {

			AsyncStorage.getItem(sampleKey).then((value) => {
				var accounts = JSON.parse(value);
				const remainingAccounts = [];
				for (a in accounts) {
					if (accounts[a].phoneNumber !== message) {
						remainingAccounts.push(accounts[a]);
					}
				}
				AsyncStorage.setItem(sampleKey, JSON.stringify(remainingAccounts));
			})
		}
	}

	clearData() {
		AsyncStorage.removeItem(sampleKey);
	}

	render() {

		return (
			<View style={{flex: 1, padding: 20, justifyContent: 'space-evenly'}}>
				<View style={{flex: 2}}>
					<TextInput style={{flex: 1, textAlign: 'center'}} onChangeText={(text) => this.setState({text})}></TextInput>
					<Text style={{flex: 1, textAlign: 'center', fontWeight: 'bold'}}>{this.state.text}</Text>
				</View>
				<View style={{flex: 5, justifyContent: 'space-evenly'}}>
					<Button title="Save" onPress={() => this.saveData(this.state.text)}/>
					<Button title="Get" onPress={() => this.getData()}/>
					<Button title="Remove" onPress={() => this.removeFromList(this.state.text)}/>
					<Button title="Clear" onPress={() => this.clearData()}/>
				</View>
			</View>
		)
	}
};