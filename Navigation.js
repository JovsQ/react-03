import React, { Component } from 'react';
import {
	Button, 
	View,
	Text,
	YellowBox 
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Orientation from 'react-native-orientation';
import SampleScreen from './App'

class HomeScreen extends Component {
	componentWillMount() {
		YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
	}
	componentDidMount() {
		Orientation.lockToLandscape();
	}
	render() {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
	        	<Text>Home Screen</Text>
	        	<Button 
	        	title="Go To Apps"
	        	onPress={() =>
	        		this.props.navigation.navigate('Samples')
	        	} />
	      	</View>
		)
	}
	componentWillUnmount() {

	}
}

export default createStackNavigator({
	Home: { screen: HomeScreen },
	Samples: { screen: SampleScreen },
});
