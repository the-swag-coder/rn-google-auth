import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  navigation: any;
}

interface State {
  name: string;
  email: string;
  photoUrl: string;
}

class DashboardScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      photoUrl: ''
    };
  }

  componentDidMount(): void {
    this._getStorageDataHandler();
  }

  _getStorageDataHandler(): void {
    AsyncStorage.getItem(
      'google_auth'
    ).then((data: any) => {
      const storageData = JSON.parse(data);

      this.setState({
        name: storageData.user.name,
        email: storageData.user.email,
        photoUrl: storageData.user.photoUrl
      })
    });
  }

  _logoutHandler(): void {
    AsyncStorage.removeItem('google_auth').then();
    this.props.navigation.navigate('Authentication');
  }

  render(): React.ReactNode {
    return (
      <View style={styles.container}>

        <View style={styles.contentCenter}>
          <View style={styles.cardContainer}>
            <Text style={{fontSize: 16}}>Name: {this.state.name}</Text>
            <Text style={{fontSize: 16}}>Email: {this.state.email}</Text>

            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.buttonContainer}
              onPress={() => this._logoutHandler()}
            >
              <View style={styles.buttonTextContainer}>
                <Text style={styles.buttonText}>Logout</Text>
              </View>
            </TouchableOpacity>
          </View>

          {
            this.state.photoUrl
            ? <View style={styles.avatarContainer}>
              <Image
                source={{uri: this.state.photoUrl}}
                style={styles.avatarContainer}
              />
              </View>
              : <View style={[styles.avatar, {backgroundColor: '#AAAAAA'}]}/>
          }
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardContainer: {
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 10,
    borderWidth: 2,
    padding: 20,
    paddingTop: 50
  },
  buttonContainer: {
    backgroundColor: 'red',
    borderRadius: 5,
    paddingVertical: 20,
    marginTop: 10
  },
  buttonTextContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 14,
    alignSelf: 'center',
    color: 'white'
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    height: 80,
    width: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: 'black',
    position: 'absolute',
    top: '34%'
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 30
  }
});

export default DashboardScreen;
