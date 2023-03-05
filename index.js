import { registerRootComponent } from 'expo';
import { Provider } from 'react-redux';

import App from './App';
import { appStore } from './store/store';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
const BaseAop = () => <Provider store={appStore}><App /></Provider>;
registerRootComponent(BaseAop);
