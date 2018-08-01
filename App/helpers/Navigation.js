import { createStackNavigator, StackNavigator } from 'react-navigation';

//screens
import Login from '../screens/Login';
import LockerSelection from '../screens/LockerSelection';
import PaymentScreen from '../../components/PaymentScreen';
import OpenLockerScreen from '../../components/OpenLockerScreen';
import EnterPinScreen from '../../components/EnterPinScreen';
import ThankYouScreen from '../../components/ThankYouScreen';
import ServiceSelectScreen from '../../components/ServiceSelectScreen.js';
import PickupLockerScreen from '../../components/PickupLockerScreen.js';
import SuccessfulPickupScreen from '../../components/SuccessfulPickupScreen.js';
import DropOffLockerScreen from '../../components/DropOffLockerScreen.js';
import SuccessfulDropOffScreen from '../../components/SuccessfulDropOffScreen.js';

export default createStackNavigator({
	Home: { 
		screen: Login,
		navigationOptions: {
            header: null
        } 
    },
	SelectLocker: {
		screen: LockerSelection,
		navigationOptions: {
			header: null
		}
	},
	Payment: {
		screen: PaymentScreen,
		navigationOptions: {
			header: null
		}
	},
	OpenLocker: {
		screen: OpenLockerScreen,
		navigationOptions: {
			header: null
		}
	},
	EnterPin: {
		screen: EnterPinScreen,
		navigationOptions: {
			header: null
		}
	},
	ThankYou: {
		screen: ThankYouScreen,
		navigationOptions: {
			header: null
		}
	},
	ServiceSelect: {
		screen: ServiceSelectScreen,
		navigationOptions: {
			header: null
		}
	},
	PickupLocker: {
		screen: PickupLockerScreen,
		navigationOptions: {
			header: null
		}
	},
	SuccessfulPickup: {
		screen: SuccessfulPickupScreen,
		navigationOptions: {
			header: null
		}
	},
	DropOffLocker: {
		screen: DropOffLockerScreen,
		navigationOptions: {
			header: null
		}
	},
	SuccessfulDropOff: {
		screen: SuccessfulDropOffScreen,
		navigationOptions: {
			header: null
		}
	}
});