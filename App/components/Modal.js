import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native';

export const ConfirmationModal = ({ onConfirm, onCancel }) =>
	<View style={ modalStyles.content }>
	  	<View style={ modalStyles.labelContainer }>
	  		<Text style={ modalStyles.text }>Assign locker</Text>
	    	<Text style={ modalStyles.text }>to <Text style={ modalStyles.highlightBlue }>09950815097</Text></Text>
	  	</View>
	    <View style={ modalStyles.buttonsContainer }>
	    	<ModalButton
		    title='No'
		    onPress={ onCancel }
		    color={ modalStyles.negativeColor }
		    />
	    	<ModalButton
		    title='Yes'
		    onPress={ onConfirm }
		    color={ modalStyles.positiveColor }
		    />		    
	    </View>    
	</View>

const ModalButton = ({ title, onPress, color}) =>
  	<TouchableOpacity style={[modalStyles.button, color]} onPress={onPress}>
	    <Text style={modalStyles.buttonText}>{title}</Text>
  	</TouchableOpacity>

const modalStyles = StyleSheet.create({
	content: {
		backgroundColor: 'white',
	    width: '70%',
	    height: '70%',
	    padding: 10,
	    justifyContent: 'space-evenly',
	    alignItems: 'center',
	    alignSelf: 'center',
	    borderRadius: 4,
	    borderColor: 'rgba(0, 0, 0, 0.1)',
	},
	labelContainer: {
		flex: 2, 
		justifyContent: 'center', 
		alignItems: 'center'
	},
	text: {
		fontWeight: '400',
		fontSize: 18,
		textAlign: 'center',
		alignSelf: 'center'
	},
	highlightBlue: {
		fontWeight: '700',
		color: '#519FE2'
	},
	buttonsContainer: {
		flex: 1, 
		flexDirection: 'row', 
		justifyContent: 'space-evenly', 
		width: '100%', 
		alignItems: 'center'
	},
	positiveColor: {
		backgroundColor: '#519FE2' 
	},
	negativeColor: {
		backgroundColor: 'gray'
	},
	buttonText: {
		fontSize: 18, 
		color: 'white'
	},
	button: {
		width: '40%',
		height: 40, 
		borderRadius: 5, 
		justifyContent: 'center', 
		alignItems: 'center', 
		elevation: 2
	}
});