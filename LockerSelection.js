import React, { Component } from 'react';
import {
	BackHandler,
	Button,
	Image,
	ImageBackground,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native';
import Orientation from 'react-native-orientation';
import { createStackNavigator } from 'react-navigation';
import SampleScreen from './App';
import AsyncStorageHelper from './AsyncStorageHelper';

import appBG from './images/app_bg.png';
import arrowLeft from './images/arrow_left.png';
import smallLocker from './images/small_locker.png';
import bigLocker from './images/big_locker.png';

export default class LockerSelection extends Component {

	componentDidMount() {
		Orientation.lockToLandscape();
		BackHandler.addEventListener('hardwareBackPress', this.hadleBackButton);
	}

	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.hadleBackButton);
	}

	hadleBackButton() {
		return true;
	}

	render() {

		const { navigation } = this.props;
		const phoneNumber = this.props.navigation.getParam('phoneNumber', '0');

		return (
			<ImageBackground source={appBG} alt="bg" style={lockerStyles.container}>
				<View style={lockerStyles.navHeader}>
	            	<TouchableOpacity style={lockerStyles.headerButtonLeft} onPress={() => navigation.navigate('Home')}>
	            		<Image source={arrowLeft} alt="arrow_left" style={lockerStyles.backButton}/>
	            	</TouchableOpacity>
	            	<View style={lockerStyles.headerTextContainer}>
	            		<Text style={lockerStyles.headerText}>Select Locker Size</Text>
	            	</View>
	          		<View style={lockerStyles.headerButtonRight}></View>
	          	</View>
	          	<View style={lockerStyles.mainContent}>
	          		<TouchableOpacity style={lockerStyles.lockerButton} onPress={() => navigation.navigate('Payment', {
	            		phoneNumber: phoneNumber,
	            		size: 'Big Locker',
	            		price: 600
	            	})}>
	          			<View style={lockerStyles.lockerImageContainer}> 
	          				<Image source={bigLocker} style={lockerStyles.bigLocker} alt="big_locker"/>
	          			</View>
	          			<View style={lockerStyles.lockerTextContainer}>
	          				<Text style={lockerStyles.lockerText}>Big Locker</Text>
	          				<Text style={lockerStyles.lockerPrice}>P600.00</Text>
	          			</View>
	          			
	          		</TouchableOpacity>
	          		<TouchableOpacity style={lockerStyles.lockerButton} onPress={() => navigation.navigate('Payment', {
	          		phoneNumber: phoneNumber,
	          		size: 'Small Locker',
	          		price: 400})}>
	          			<View style={lockerStyles.lockerImageContainer}>
	          				<Text style={{flex: 1}}></Text>
	          				<Image source={smallLocker} style={lockerStyles.smallLocker} alt="small_locker"/>
	          			</View>	          			
	          			<View style={lockerStyles.lockerTextContainer}>
	          				<Text style={lockerStyles.lockerText}>Small Locker</Text>
	          				<Text style={lockerStyles.lockerPrice}>P400.00</Text>
	          			</View>
	          		</TouchableOpacity>
	            	
	          	</View>
			</ImageBackground>
		)
	}
}

const lockerStyles = StyleSheet.create({
	container: {
		flex: 1, 
		flexDirection: 'column',
		justifyContent: 'space-evenly', 
		alignItems: 'center'
	},
	navHeader: {
		flex: 2,
		flexDirection: 'row',
		justifyContent: 'center'
	},
	headerTextContainer: {
		flex: 6,
		justifyContent: 'center',
		alignItems: 'center',
	},
	headerText: {
		fontWeight: '200',
		fontSize: 18
	},
	headerButtonLeft: {
		flex: 2,
		justifyContent: 'center',
		alignItems: 'center'
	},
	backButton: {
		resizeMode: 'contain',
		width: 25,
		height: 25
	},
	headerButtonRight: {
		flex: 2,
	},
	mainContent: {
		flex: 9,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		paddingBottom: 20,
		paddingLeft: 20,
		paddingRight: 20
	},
	lockerButton: {
		backgroundColor: 'white',
		width: '40%',
		justifyContent: 'center',
		borderRadius: 10,
		elevation: 2
	},
	lockerImageContainer: {
		flex: 5, 
		padding: 20, 
		justifyContent: 'center'
	},
	lockerTextContainer: {
		flex: 3, 
		flexDirection: 'column'
	},
	lockerText: {
		fontWeight: 'bold',
		fontSize: 20,
		textAlign: 'center'
	},
	lockerPrice: {
		fontWeight: 'bold',
		fontSize: 20,
		textAlign: 'center',
		color: '#519FE2'
	},
	bigLocker: {
		flex: 1, 
		aspectRatio: 1.5, 
		resizeMode: 'contain', 
		alignSelf: 'center'
	},
	smallLocker: {
		flex: 4, 
		aspectRatio: 1.5, 
		resizeMode: 'contain', 
		alignSelf: 'center'
	}
})