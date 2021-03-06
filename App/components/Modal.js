import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native';
import Modal from 'react-native-modal';

export const ChoiceModal = ({ title, highlight, additionalText, onConfirm, onCancel, isVisible }) =>
	<Modal isVisible={ isVisible }>
		<View style={ modalStyles.content }>
		  	<ModalLabel
		  		title={ title }
		  		highlight={ highlight }
		  		additionalText={ additionalText }/>
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
	</Modal>

export const ConfirmationModal = ({ text, onConfirm, isVisible }) =>
	<Modal isVisible={ isVisible }>
		<View style={ modalStyles.content }>
			<View style={ modalStyles.labelContainer }>
		  		<Text style={ modalStyles.text }>{ text }</Text>
		  	</View>
		    <View style={ modalStyles.buttonsContainer }>
		    	<ModalFullButton
			    title='Ok'
			    onPress={ onConfirm }
			    color={ modalStyles.positiveColor }
			    />		    
		    </View>    
		</View>
	</Modal>

const ModalLabel = ({ title, highlight, additionalText }) =>
	{
		if (additionalText != '') {
			return (
				<View style={ modalStyles.labelContainer }>
			  		<Text style={ modalStyles.text }>{ additionalText }</Text>
			    	<Text style={ modalStyles.text }>{ title } <Text style={ modalStyles.highlightBlue }>{ highlight }</Text>?</Text>
			  	</View>
			)
		} else {
			return (
				<View style={ modalStyles.labelContainer }>
			  		<Text style={ modalStyles.text }>{ title } <Text style={ modalStyles.highlightBlue }>{ highlight }</Text>?</Text>
			  	</View>
			)			
		}
	}

const ModalButton = ({ title, onPress, color}) =>
  	<TouchableOpacity style={[modalStyles.button, color]} onPress={onPress}>
	    <Text style={modalStyles.buttonText}>{title}</Text>
  	</TouchableOpacity>

const ModalFullButton = ({ title, onPress, color }) =>
	<TouchableOpacity style={[modalStyles.button, modalStyles.fullButton, color]} onPress={onPress}>
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
	},
	fullButton: {
		width: '80%'
	}
});