import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Google from 'expo-google-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Environment from '../constants/Environment';

interface Props {
  navigation: any;
}

interface State {
}

class AuthenticationScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  _googleSignInHandler = async () => {
    try {
      const googleRes: any = await Google.logInAsync({
        iosClientId: Environment.IOS_CLIENT_ID,
        androidClientId: Environment.ANDROID_CLIENT_ID
      });

      if (googleRes.type === 'success') {
        AsyncStorage.setItem(
          'google_auth',
          JSON.stringify(googleRes)
        ).then(() => {
          this.props.navigation.navigate('Dashboard');
        })
      }
    } catch (e) {
      console.log(e);
    }
  };

  render(): React.ReactNode {
    return (
      <View style={styles.container}>

        <ImageBackground
          source={require('../assets/bg-image.jpg')}
          blurRadius={7}
          style={styles.bgImage}
        >

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.buttonContainer}
            onPress={() => this._googleSignInHandler()}
          >
            <Image
              source={require('../assets/google.png')}
              style={styles.googleIcon}
            />
            <View style={styles.buttonTextContainer}>
              <Text style={styles.buttonText}>Continue with Google</Text>
            </View>
          </TouchableOpacity>

        </ImageBackground>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bgImage: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 30
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderRadius: 5
  },
  buttonTextContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 14,
    alignSelf: 'center'
  },
  googleIcon: {
    height: 24,
    width: 24
  }
});

export default AuthenticationScreen;
