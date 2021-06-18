import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import StartupScreen from '../screens/StartupScreen';
import AuthenticationScreen from '../screens/AuthenticationScreen';
import DashboardScreen from '../screens/DashboardScreen';

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Authentication: AuthenticationScreen,
  Dashboard: DashboardScreen
});

export default createAppContainer(MainNavigator);
