import React, { Component } from 'react';
import Orientation from 'react-native-orientation';
import {
	Alert,
	Button,
	FlatList,
	Image,
	ImageBackground,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native';


import appBG from '../images/app_bg.png';
import lock from '../images/padlock.png';
import arrowLeft from '../images/arrow_left.png';

export default class PickupLockerScreen extends Component {
	
	componentDidMount() {
		Orientation.lockToLandscape();
	}

	itemSelected(item, lockerNo) {
		Alert.alert(item + ' ' + lockerNo);
	}

	render() {

		const { navigation } = this.props;
		const sampleData = [
			{key: '09950815097', lockerNo: 1},
			{key: '09123456789', lockerNo: 2},
			{key: '09123456788', lockerNo: 3},
			{key: '09123456787', lockerNo: 4},
			{key: '09123456786', lockerNo: 5},
			{key: '09123456785', lockerNo: 6},
			{key: '09123456784', lockerNo: 7},
			{key: '09123456783', lockerNo: 8}
		]
		const colors = [
			'white','#DCDCDC'
		]

		return (
			<ImageBackground source={appBG} alt="app_bg" style={pickupStyles.container}>
				<View style={pickupStyles.navHeader}>
	            	<TouchableOpacity style={pickupStyles.headerButtonLeft} onPress={() => navigation.navigate('ServiceSelect')}>
	            		<Image source={arrowLeft} alt="arrow_left" style={pickupStyles.backButton}/>
	            	</TouchableOpacity>
	            	<View style={pickupStyles.headerTextContainer}>
	            		<Text style={pickupStyles.headerText}>Select which Locker to Open</Text>
	            	</View>
	          		<View style={pickupStyles.headerButtonRight}></View>
	          	</View>
	          	<View style={pickupStyles.mainContent}>
	          		<View style={pickupStyles.cardContent}>
	          			<FlatList style={pickupStyles.list}
				        data={sampleData}
				       	keyExtractor={(item, index) => index.toString()}
				        renderItem={({item, index}) => <TouchableOpacity style={{backgroundColor: colors[index % colors.length], flex: 1,	flexDirection: 'row', padding: 10, paddingLeft: 30, paddingRight: 30}}
				        onPress={this.itemSelected.bind(this, item.key, item.lockerNo)}>
				        	<Image source={lock} alt='lock' style={pickupStyles.lock}/>
				        	<Text style={pickupStyles.item} >{item.key}</Text>
				        	<Text style={pickupStyles.lockerNo} >#{item.lockerNo}</Text>
				        </TouchableOpacity>}/>
				        <TouchableOpacity style={pickupStyles.selectButton} onPress={() => navigation.navigate('Home')}>
				        	<Text style={pickupStyles.selectButtonLabel}>Done</Text>
				        </TouchableOpacity>
	          		</View>	          		
	          	</View>
			</ImageBackground>
		)
	}
}

const pickupStyles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
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
		justifyContent: 'center',
		paddingLeft: 20,
		paddingRight: 20,
		paddingBottom: 20
	},
	cardContent: {
		width: '70%',
		backgroundColor: 'white',
		alignSelf: 'center',
		elevation: 2,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10
	},
	list: {
		width: '100%',
		height: '85%'
	},
	item: {
		flex: 7,
	    fontSize: 18,
	    textAlign: 'left'
	},
	lockerNo: {
		flex: 1,
		textAlign: 'right',
		fontSize: 18
	},
	selectButton: {
		width: '100%',
		height: '15%',
		backgroundColor: '#519FE2',
		alignSelf: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10
	},
	selectButtonLabel: {
		textAlign: 'center',
		color: 'white',
		fontSize: 18
	},
	itemContainer: {
		flex: 1,
		flexDirection: 'row',
		padding: 10,
	    paddingLeft: 30,
	    paddingRight: 30,
	},
	lock: {
		flex: 2,
		resizeMode: 'contain',
		width: 20,
		height: 20
	}
})

