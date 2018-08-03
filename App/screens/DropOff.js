import React, { Component } from 'react';
import Orientation from 'react-native-orientation';
import {
	AsyncStorage,
	FlatList,
	Image,
	ImageBackground,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native';

//components
import { ChoiceModal, ConfirmationModal } from '../components/Modal'

//images
import appBG from '../assets/app_bg.png';
import lock from '../assets/padlock.png';
import arrowLeft from '../assets/arrow_left.png';

import { 
	alertNotAvailable, 
	appKey,
	bigLockers,
	colors,
	smallLockers	
} from '../helpers/Constants';

export default class DropOffLockerScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			accounts: [],
			modalVisible: false,
			confirmModal: false,
			phoneNumber: '',
			size: '',
			status: '',
			code: ''
		}
	}

	componentDidMount() {
		this.fetchData();
		Orientation.lockToLandscape();
	}

	itemSelected(phoneNumber, size, status, code) {
		this.setState({modalVisible: false});
		if (status != 'clean') {
			var selectedSize = size == 'big' ? bigLockers : smallLockers;
			AsyncStorage.getItem(appKey)
			.then((value) => {
				var accounts = JSON.parse(value);

				if (!accounts) {
					const randomLocker = selectedSize[Math.floor(Math.random() * selectedSize.length)];
					this.updateItems(phoneNumber, randomLocker, code, accounts);
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
						const randomLocker = selectedSize[Math.floor(Math.random() * selectedSize.length)];
						this.upateItems(phoneNumber, randomLocker, code, accounts);
					} else {
						this.setState({confirmModal: true});
					}
				}
			})
			.catch((error) => {
				Alert.alert(`${error.message}`);
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

	upateItems(phoneNumber, locker, code, allAccounts) {

		var remainingAccounts = [];

		for (a in allAccounts) {
			if (allAccounts[a].phoneNumber == phoneNumber && allAccounts[a].status == 'drop off' && allAccounts[a].code == code) {
				allAccounts[a].status = 'clean';
				allAccounts[a].locker = locker;
			}
			if (allAccounts[a].status == 'drop off' || allAccounts[a].status == 'clean') {
				remainingAccounts.push(allAccounts[a]);
			}
		}

		AsyncStorage.setItem(appKey, JSON.stringify(allAccounts))
		.then((value) => {
			this.setState(
			{ accounts: remainingAccounts },
			() => {
				this.props.navigation.navigate('SuccessfulDropOff', {
					phoneNumber: phoneNumber,
					code: code,
					locker: locker
				})
			}
			)
		})
		.catch((error) => {
			Alert.alert(`${error.message}`);
		})
	}

	fetchData() {
		AsyncStorage.getItem(appKey).then((value) => {
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

		const title = 'to';
		const additionalText = 'Assign locker';

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
				        onPress={() => this.setState({ phoneNumber: item.phoneNumber, size: item.size, status: item.status, code: item.code, modalVisible: true})}>
				        	<Text style={dropOffStyles.item} >{item.phoneNumber}</Text>
				        	<Text style={dropOffStyles.lockerNo} >{this.showLocker(item.status, item.locker)}</Text>
				        </TouchableOpacity>}/>
				        <TouchableOpacity style={dropOffStyles.selectButton} onPress={() => navigation.navigate('Home')}>
				        	<Text style={dropOffStyles.selectButtonLabel}>Done</Text>
				        </TouchableOpacity>
	          		</View>	          		
	          	</View>

	          	<ChoiceModal 
	          	title={ title }
	          	highlight={ this.state.phoneNumber }
	          	additionalText={ additionalText }
	          	onConfirm={() => this.itemSelected(this.state.phoneNumber, this.state.size, this.state.status, this.state.code)}
	          	onCancel={() => this.setState({modalVisible: false})}
	          	isVisible={ this.state.modalVisible }
	          	/>

	          	<ConfirmationModal
	          	text={ alertNotAvailable }
        		isVisible={ this.state.confirmModal }
        		onConfirm={() => this.setState({ confirmModal: false })} />
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