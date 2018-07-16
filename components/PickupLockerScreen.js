import React, { Component } from 'react';
import Orientation from 'react-native-orientation';
import {
	Alert,
	AsyncStorage,
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

const SMART_LOCKER_KEY = 'SMART LOCKER KEY';

export default class PickupLockerScreen extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			accounts : []
		}
	}

	componentDidMount() {
		this.fetchData();
		Orientation.lockToLandscape();
	}

	componentWillUnmount() {

	}

	itemSelected(phoneNumber, locker) {
		// var accountsList = this.state.accounts;

		// var remainingAccounts = [];
		// var newList = [];

		// for (a in accountsList) {
		// 	if (accountsList[a].phoneNumber == phoneNumber && accountsList[a].locker == locker) {
		// 		accountsList[a].status = 'drop off';
		// 	} else {
		// 		remainingAccounts.push(accountsList[a]);
		// 	}
		// }

		// AsyncStorage.setItem(SMART_LOCKER_KEY, JSON.stringify(newList))
		// .then((value) => {

		// 	var stringIna = 'default string: ';
		// 	for (n in newList) {
		// 		stringIna += `${newList[n].status} ` ;
		// 	}

		// 	Alert.alert(stringIna);
		// 	this.setState(
		// 		{ accounts: remainingAccounts },
		// 		() => {
		// 			this.props.navigation.navigate('SuccessfulPickup', {
		// 				phoneNumber: phoneNumber,
		// 				locker: locker
		// 			})
		// 		})
		// })

		// ---------------------

		AsyncStorage.getItem(SMART_LOCKER_KEY).then((value) => {
			var allAccounts = JSON.parse(value);
			if (!allAccounts) {
				allAccounts = [];
			}

			var remainingAccounts = [];

			for (a in allAccounts) {
				if (allAccounts[a].phoneNumber == phoneNumber && allAccounts[a].locker == locker && allAccounts[a].status == 'pickup') {
					allAccounts[a].status = 'drop off';
				} else if (allAccounts[a].status =='pickup') {
					remainingAccounts.push(allAccounts[a]);
				}
			}

			AsyncStorage.setItem(SMART_LOCKER_KEY, JSON.stringify(allAccounts))
			.then((value) => {
				this.setState(
				{ accounts: remainingAccounts },
				() => {
					this.props.navigation.navigate('SuccessfulPickup', {
						phoneNumber: phoneNumber,
						locker: locker
					})
				})		
			})
		})
	}

	fetchData() {
		AsyncStorage.getItem(SMART_LOCKER_KEY).then((value) => {
			var accounts = JSON.parse(value);
			if (!accounts) {
				accounts = [];
			}

			var pickupAccounts = [];
			for (a in accounts) {
				if (accounts[a].status == 'pickup') {
					pickupAccounts.push(accounts[a]);
				}
			}

			this.setState({
				accounts: pickupAccounts
			})			
		});
	}

	render() {

		const { navigation } = this.props;
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
				        data={this.state.accounts}
				       	keyExtractor={(item, index) => index.toString()}
				        renderItem={({item, index}) => <TouchableOpacity style={{backgroundColor: colors[index % colors.length], flex: 1,	flexDirection: 'row', padding: 10, paddingLeft: 10, paddingRight: 30}}
				        onPress={this.itemSelected.bind(this, item.phoneNumber, item.locker)}>
				        	<Image source={lock} alt='lock' style={pickupStyles.lock}/>
				        	<Text style={pickupStyles.item} >{item.phoneNumber}</Text>
				        	<Text style={pickupStyles.lockerNo} >#{item.locker}</Text>
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
		width: '60%',
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

