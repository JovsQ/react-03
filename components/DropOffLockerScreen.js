import React, { Component } from 'react';
import Orientation from 'react-native-orientation';
import {
	Alert,
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

export default class DropOffLockerScreen extends Component {

	componentDidMount() {
		Orientation.lockToLandscape();
	}

	itemSelected(item) {
		Alert.alert(item);
	}

	render() {

		const { navigation } = this.props;
		const sampleData = [
			{key: '09950815097'},
			{key: '09123456789'},
			{key: '09123456788'},
			{key: '09123456787'},
			{key: '09123456786'},
			{key: '09123456785'},
			{key: '09123456784'},
			{key: '09123456783'}
		];
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
				        data={sampleData}
				       	keyExtractor={(item, index) => index.toString()}
				        renderItem={({item, index}) => <TouchableOpacity style={{backgroundColor: colors[index % colors.length], flex: 1,	flexDirection: 'row', padding: 10, paddingLeft: 30, paddingRight: 30}}
				        onPress={this.itemSelected.bind(this, item.key)}>
				        	<Text style={dropOffStyles.item} >{item.key}</Text>
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
	    letterSpacing: 1,
	    paddingLeft: 30
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