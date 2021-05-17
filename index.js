/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Weather from './src/screen/Weather';

AppRegistry.registerComponent(appName, () => Weather);
