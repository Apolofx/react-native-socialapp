import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    StatusBar,
    LayoutAnimation,
} from 'react-native';
import * as firebase from 'firebase';

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        headerShown: false,
    };

    state = {
        email: '',
        password: '',
        errorMessage: null,
    };

    handleLogin = () => {
        const {email, password} = this.state;
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch(error => {
                this.setState({
                    errorMessage: error.message,
                });
            });
    };

    render() {
        LayoutAnimation.easeInEaseOut();
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <Image
                    source={require('../assets/header.png')}
                    style={{
                        height: 400,
                        width: 400,
                        marginTop: -170,
                        marginLeft: -100,
                    }}
                />
                <Image
                    source={require('../assets/applogo.png')}
                    style={{alignSelf: 'center', marginTop: -160}}
                />
                <Image
                    source={require('../assets/header.png')}
                    style={{
                        height: 350,
                        width: 350,
                        position: 'absolute',
                        bottom: -250,
                        right: -50,
                    }}
                />
                <Text style={styles.greeting}>{'Bienvenido!'}</Text>

                <View style={styles.errorMessage}>
                    {this.state.errorMessage && (
                        <Text style={styles.error}>
                            {this.state.errorMessage}
                        </Text>
                    )}
                </View>

                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>Email Address</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={email => this.setState({email})}
                            value={this.state.email}
                        />
                    </View>
                    <View style={{marginTop: 32}}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry
                            autoCapitalize="none"
                            onChangeText={password => this.setState({password})}
                            value={this.state.password}
                        />
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={this.handleLogin}>
                    <Text style={{color: '#FFF', fontWeight: '500'}}>
                        Sign In
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{alignSelf: 'center', marginTop: 20}}
                    onPress={() => this.props.navigation.navigate('Register')}>
                    <Text style={{color: '#414959', fontSize: 13}}>
                        Nuevo por aca?{' '}
                        <Text style={{color: '#009372', fontWeight: '500'}}>
                            Registrate
                        </Text>
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    greeting: {
        marginTop: -30,

        fontSize: 24,
        fontWeight: '400',
        textAlign: 'center',
    },
    errorMessage: {
        height: 72,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 30,
    },
    error: {
        color: '#E9446A',
        fontSize: 13,
        fontWeight: '600',
        textAlign: 'center',
    },
    form: {marginTop: -40, marginBottom: 4, marginHorizontal: 30},
    inputTitle: {
        color: '#8A8F9E',
        fontSize: 10,
        textTransform: 'uppercase',
    },
    input: {
        borderBottomColor: '#8A8F9E',
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: '#161F3D',
    },
    button: {
        marginTop: 20,
        marginHorizontal: 30,
        backgroundColor: '#00deb2',
        borderRadius: 4,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
