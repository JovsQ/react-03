import React, { Component } from 'react';
import {
	AsyncStorage,
	Button,
	Text,
	TextInput,
	View,
} from 'react-native'

export default class AsyncStorageExamplre extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			name: ''
		}
	}

	componentDidMount() {
		AsyncStorage
	}

	render() {

		return (

		);
	}
}