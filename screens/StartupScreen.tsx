import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  navigation: any;
}

interface State {
}

class StartupScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render(): React.ReactNode {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('google_auth');
      if (!userData) {
        this.props.navigation.navigate('Authentication');
        return;
      }

      this.props.navigation.navigate('Dashboard');
    };

    tryLogin().then();

    return (
      <View style={styles.container}>
        <ActivityIndicator size={'large'} color={'blue'}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default StartupScreen;
