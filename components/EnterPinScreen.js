import React, { Component } from 'react';
import Orientation from 'react-native-orientation';
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


import appBG from '../images/app_bg.png';
import arrowLeft from '../images/arrow_left.png';
import oneButton from '../images/one.png';
import twoButton from '../images/two.png';
import threeButton from '../images/three.png';
import fourButton from '../images/four.png';
import fiveButton from '../images/five.png';
import sixButton from '../images/six.png';
import sevenButton from '../images/seven.png';
import eightButton from '../images/eight.png';
import nineButton from '../images/nine.png';
import zeroButton from '../images/zero.png';

export default class EnterPinScreen extends Component {

	componentDidMount() {
		Orientation.lockToLandscape();
	}

	componentWillUnmount() {

	}

	validatePin() {
		this.props.navigation.navigate('ThankYou');
	}

	render() {
		const { navigation } = this.props;
		const phoneNumber = this.props.navigation.getParam('phoneNumber', '0');

		return (
			<ImageBackground source={appBG} style={pinStyles.container} alt='bg'>
				<View style={pinStyles.navHeader}>
	            	<TouchableOpacity style={pinStyles.headerButtonLeft} onPress={() => navigation.navigate('Home')}>
	            		<View style={pinStyles.backButtonContainer}>
	            			<Image source={arrowLeft} alt="arrow_left" style={pinStyles.backButton}/>
	            		</View>	            		
	            		<View style={pinStyles.leftSpace}/>
	            	</TouchableOpacity>
	            	<View style={pinStyles.headerTextContainer}>
	            		<View style={pinStyles.mainCard}>
		          			<View style={pinStyles.headerLabel}>
		          				<Text style={pinStyles.headerText}>Please enter PIN we sent to your</Text>
		          				<Text style={pinStyles.headerText}>mobile number to open locker</Text>
		          			</View>
		          			<Text style={pinStyles.input}>------</Text>
		          			<View style={pinStyles.numpad}>
		          				<View style={pinStyles.numpadRow}>
		          					<TouchableOpacity style={pinStyles.numpadButton} onPress={() => navigation.navigate('ServiceSelect')}>
		          						<Image source={oneButton} alt="one_button" style={pinStyles.numberButton}/>
		          					</TouchableOpacity>
		          					<TouchableOpacity style={pinStyles.numpadButton}>
		          						<Image source={twoButton} alt="two_button" style={pinStyles.numberButton}/>
		          					</TouchableOpacity>
		          					<TouchableOpacity style={pinStyles.numpadButton}>
		          						<Image source={threeButton} alt="three_button" style={pinStyles.numberButton}/>
		          					</TouchableOpacity>		          					
		          				</View>
		          				<View style={pinStyles.numpadRow}>
		          					<TouchableOpacity style={pinStyles.numpadButton}>
		          						<Image source={fourButton} alt="four_button" style={pinStyles.numberButton}/>
		          					</TouchableOpacity>
		          					<TouchableOpacity style={pinStyles.numpadButton}>
		          						<Image source={fiveButton} alt="five_button" style={pinStyles.numberButton}/>
		          					</TouchableOpacity>
		          					<TouchableOpacity style={pinStyles.numpadButton}>
		          						<Image source={sixButton} alt="six_button" style={pinStyles.numberButton}/>
		          					</TouchableOpacity>
		          				</View>
		          				<View style={pinStyles.numpadRow}>
		          					<TouchableOpacity style={pinStyles.numpadButton}>
		          						<Image source={sevenButton} alt="seven_button" style={pinStyles.numberButton}/>
		          					</TouchableOpacity>
		          					<TouchableOpacity style={pinStyles.numpadButton}>
		          						<Image source={eightButton} alt="eight_button" style={pinStyles.numberButton}/>
		          					</TouchableOpacity>
		          					<TouchableOpacity style={pinStyles.numpadButton}>
		          						<Image source={nineButton} alt="nine_button" style={pinStyles.numberButton}/>
		          					</TouchableOpacity>
		          				</View>
		          				<View style={pinStyles.numpadRow}>
		          					<TouchableOpacity style={pinStyles.numpadButton} onPress={() => this.validatePin()}>
		          						<Image source={zeroButton} alt="zero_button" style={pinStyles.numberButton}/>
		          					</TouchableOpacity>
		          				</View>
		          			</View>
		          			<Text style={pinStyles.footerLabel}>If you did not receive a pin. <Text style={pinStyles.highlightBlack}>CLick Here</Text></Text>
		          		</View>
	            	</View>
	            	<View style={pinStyles.headerButtonRight}></View>
	          	</View>
	          	
			</ImageBackground>
		)
	}
}

const pinStyles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center'
	}, 
	navHeader: {
		flex: 2,
		flexDirection: 'row',
		justifyContent: 'center'
	},
	headerButtonLeft: {
		flex: 2,
		justifyContent: 'center',
		alignItems: 'center'
	},
	headerButtonRight: {
		flex: 2
	},
	headerTextContainer: {
		flex: 6,
		justifyContent: 'center',
		width: '100%',
		padding: 20
	},
	backButtonContainer: {
		flex: 2,
		justifyContent: 'center'
	},
	backButton: {		
		width: 25,
		height: 25
	},
	numberButton:{
		alignSelf: 'center',
		width: 25,
		height: 25
	},
	leftSpace: {
		flex: 9
	},
	mainContent: {
		flex: 9,
		width: '100%',
		paddingBottom: 20,
		paddingLeft: 20,
		paddingRight: 20
	},
	mainCard: {
		flex: 1,
		width: '100%',
		elevation: 2,
		alignSelf: 'center',
		padding: 10,
		backgroundColor: 'white',
		borderRadius: 10
	},
	headerLabel: {
		flex: 1.5
	},
	headerText: {
		fontWeight: '400',
		fontSize: 18,
		textAlign: 'center'
	},
	footerLabel: {
		flex: 1,
		fontWeight: '400',
		fontSize: 16,
		textAlign: 'center'
	},
	highlightBlack: {
		fontWeight: '700'
	},
	input: {
		flex: 1,
		fontWeight: '700',
		fontSize: 20,
		textAlign: 'center'
	},
	numpad: {
		flex: 4
	},
	numpadRow: {
		flex: 1,
		width: '100%',
		justifyContent: 'center',
		flexDirection: 'row'
	},
	numpadButton: {
		width: '20%',
		justifyContent: 'center'
	}
})