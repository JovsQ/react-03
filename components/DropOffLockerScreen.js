import React, { Component } from 'react';
import Orientation from 'react-native-orientation';
import {
	Alert,
	AsyncStorage,
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
const BIG_LOCKERS = ['1', '2', '3'];
const SMALL_LOCKERS = ['4', '5', '6'];

export default class DropOffLockerScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			accounts: []
		}
	}

	componentDidMount() {
		this.fetchData();
		Orientation.lockToLandscape();
	}

	itemSelected(phoneNumber, size, status) {
		// TODO assign locker
		if (status != 'clean') {
			var selectedSize = size == 'big' ? BIG_LOCKERS : SMALL_LOCKERS;
			AsyncStorage.getItem(SMART_LOCKER_KEY)
			.then((value) => {
				var accounts = JSON.parse(value);

				if (!accounts) {
					this.updateItems(phoneNumber, selectedSize[Math.floor(Math.random() * selectedSize.length)], accounts);
				} else {
					var notAvailable = [];
					for (a in accounts) {
						if (accounts[a].status == 'pickup' || accounts[a].status == 'clean') {
							notAvailable.push(accounts[a].locker);
						}
					}

					for (n in notAvailable) {
						selectedSize = this.removeFromList(selectedSize, notAvailable[n]);
					}

					if (selectedSize.length > 0) {
						this.upateItems(phoneNumber, selectedSize[Math.floor(Math.random() * selectedSize.length)], accounts);
					} else {
						Alert.Alert(`No locker available.`)
					}
				}
			})
			.catch((error) => {
				Alert.alert(`Line 66 error: ${error}`);
			})
		}
	}

	removeFromList(array, element) {
		var remainingArray = [];
		for (a in array) {
			if (array[a] != element) {
				remainingArray.push(array[a]);
			}
		}
		return remainingArray;
	}

	upateItems(phoneNumber, locker, allAccounts) {

		var remainingAccounts = [];

		for (a in allAccounts) {
			if (allAccounts[a].phoneNumber == phoneNumber && allAccounts[a].status == 'drop off') {
				allAccounts[a].status = 'clean';
				allAccounts[a].locker = locker;
			}
			if (allAccounts[a].status == 'drop off' || allAccounts[a].status == 'clean') {
				remainingAccounts.push(allAccounts[a]);
			}
		}

		AsyncStorage.setItem(SMART_LOCKER_KEY, JSON.stringify(allAccounts))
		.then((value) => {
			this.setState(
			{ accounts: remainingAccounts },
			() => {
				this.props.navigation.navigate('SuccessfulDropOff', {
					locker: locker
				})
			}
			)
		})
		.catch((error) => {
			Alert.alert(`Line 104 error: ${error}`);
		})
	}

	fetchData() {
		AsyncStorage.getItem(SMART_LOCKER_KEY).then((value) => {
			var accounts = JSON.parse(value);
			if (!accounts) {
				accounts = [];
			}
			var dropOffAccounts = [];
			for (a in accounts) {
				if (accounts[a].status == 'drop off' || accounts[a].status == 'clean') {
					dropOffAccounts.push(accounts[a]);
				}
			}

			this.setState({
				accounts: dropOffAccounts
			})
		})
	}

	showLocker(status, locker) {
		return status == 'clean' ? `#${locker}` : ''; 
	}

	render() {

		const { navigation } = this.props;
		const colors = [
			'white','#DCDCDC'
		];

		return (
			<ImageBackground source={appBG} alt="app_bg" style={dropOffStyles.container}>
				<View style={dropOffStyles.navHeader}>
	            	<TouchableOpacity style={dropOffStyles.headerButtonLeft} onPress={() => navigation.navigate('ServiceSelect')}>
	            		<Image source={arrowLeft} alt="arrow_left" style={dropOffStyles.backButton}/>
	            	</TouchableOpacity>
	            	<View style={dropOffStyles.headerTextContainer}>
	            		<Text style={dropOffStyles.headerText}>Select one to assign locker number</Text>
	            	</View>
	          		<View style={dropOffStyles.headerButtonRight}></View>
	          	</View>
	          	<View style={dropOffStyles.mainContent}>
	          		<View style={dropOffStyles.cardContent}>
	          			<FlatList style={dropOffStyles.list}
				        data={this.state.accounts}
				       	keyExtractor={(item, index) => index.toString()}
				        renderItem={({item, index}) => <TouchableOpacity style={{backgroundColor: colors[index % colors.length], flex: 1,	flexDirection: 'row', padding: 10, paddingLeft: 30, paddingRight: 30}}
				        onPress={this.itemSelected.bind(this, item.phoneNumber, item.size, item.status)}>
				        	<Text style={dropOffStyles.item} >{item.phoneNumber}</Text>
				        	<Text style={dropOffStyles.lockerNo} >{this.showLocker(item.status, item.locker)}</Text>
				        </TouchableOpacity>}/>
				        <TouchableOpacity style={dropOffStyles.selectButton} onPress={() => navigation.navigate('Home')}>
				        	<Text style={dropOffStyles.selectButtonLabel}>Done</Text>
				        </TouchableOpacity>
	          		</View>	          		
	          	</View>
			</ImageBackground>
		)
	}
}

const dropOffStyles = StyleSheet.create({
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
	    textAlign: 'left',
	    letterSpacing: 1
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