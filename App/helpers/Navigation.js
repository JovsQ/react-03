import { createStackNavigator, StackNavigator } from 'react-navigation';

//screens
import Login from '../screens/Login';
import LockerSelection from '../screens/LockerSelection';
import PaymentScreen from '../screens/Payment';
import OpenLockerScreen from '../screens/OpenLocker';
import EnterPinScreen from '../screens/EnterPin';
import ThankYouScreen from '../screens/CustomerClaim';
import ServiceSelectScreen from '../screens/ServiceSelect.js';
import PickupLockerScreen from '../../components/PickupLockerScreen.js';
import SuccessfulPickupScreen from '../../components/SuccessfulPickupScreen.js';
import DropOffLockerScreen from '../screens/DropOff';
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