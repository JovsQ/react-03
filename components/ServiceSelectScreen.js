import React, { Component } from 'react';
import Orientation from 'react-native-orientation';
import {
	Image,
	ImageBackground,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native';

import appBG from '../images/app_bg.png';
import cleanBag from '../images/clean_bag.png';
import washingMachine from '../images/washing_machine.png';

export default class ServiceSelectScreen extends Component {

	componentDidMount() {
		Orientation.lockToLandscape();
	}

	render() {

		const { navigation } = this.props;

		return (
			<ImageBackground source={appBG} alt="bg" style={servicesStyles.container}>
				<View style={servicesStyles.navHeader}>
            		<Text style={servicesStyles.headerText}>Select Type of Service</Text>
	          	</View>
	          	<View style={servicesStyles.mainContent}>
	          		<TouchableOpacity style={servicesStyles.serviceButton} onPress={() => navigation.navigate('PickupLocker')}>
	          			<View style={servicesStyles.serviceImageContainer}> 
	          				<Image source={washingMachine} style={servicesStyles.serviceImage} alt="washing_machine"/>
	          			</View>

	          			<View style={servicesStyles.serviceDetailsContainer}>
	          				<View style={servicesStyles.label}>
	          					<Text style={servicesStyles.labelBold}>Pick Up</Text>
	          					<Text style={servicesStyles.labelText}>Laundry</Text>
	          				</View>
	          				<View style={servicesStyles.line}>
								<Text></Text>
							</View>
	          				<View style={servicesStyles.details}>
	          					<Text style={servicesStyles.detailText}>Let us take care of your dirty laundry</Text>
	          					<Text style={servicesStyles.detailText}>and expect a fast and thorough</Text>
	          					<Text style={servicesStyles.detailText}>cleaning service!</Text>
	          				</View>       				
	          			</View>	          			
	          			
	          		</TouchableOpacity>
	          		<TouchableOpacity style={servicesStyles.serviceButton} onPress={() => navigation.navigate('DropOffLocker')}>
	          			<View style={servicesStyles.serviceImageContainer}> 
	          				<Image source={cleanBag} style={servicesStyles.serviceImage} alt="clean_bag"/>
	          			</View>

	          			<View style={servicesStyles.serviceDetailsContainer}>
	          				<View style={servicesStyles.label}>
	          					<Text style={servicesStyles.labelBold}>Drop Off</Text>
	          					<Text style={servicesStyles.labelText}>Laundry</Text>
	          				</View>
	          				<View style={servicesStyles.line}>
								<Text></Text>
							</View>
	          				<View style={servicesStyles.details}>
	          					<Text style={servicesStyles.detailText}>Just within 24 hours. your clothes</Text>
	          					<Text style={servicesStyles.detailText}>will be cleaned and delivered back</Text>
	          					<Text style={servicesStyles.detailText}>to your locker</Text>
	          				</View>	          				
	          			</View>

	          		</TouchableOpacity>
	            	
	          	</View>
			</ImageBackground>
		)
	}
}

const servicesStyles = StyleSheet.create({
	container: {
		flex: 1
	},
	navHeader: {
		flex: 2,
		justifyContent: 'center',
		alignItems: 'center'
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
	headerText: {
		fontSize: 18,
		fontWeight: '200'
	},
	serviceButton: {
		backgroundColor: 'white',
		width: '40%',
		justifyContent: 'center',
		borderRadius: 10,
		elevation: 2,
		padding: 5
	},
	serviceImageContainer: {
		flex: 3, 
		padding: 20, 
		justifyContent: 'center'
	}, 
	serviceImage: {
		flex: 2, 
		aspectRatio: 1.5, 
		resizeMode: 'contain', 
		alignSelf: 'center'
	},
	serviceDetailsContainer: {
		flex: 5,
		width: '100%',
		justifyContent: 'center'
	},
	label: {
		height: '35%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	labelText: {
		color: 'black'
	},
	labelBold: {
		fontWeight: '700',
		color: 'black'	
	},
	line: {
		width: '70%',
		height: '5%',
		borderBottomColor: 'black',
		borderBottomWidth: 1,
		alignSelf: 'center'
	},
	details: {
		height: '60%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	detailText: {
		fontSize: 12,
		alignSelf: 'center'
	}
})