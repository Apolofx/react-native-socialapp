import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar
} from "react-native";
import Ionicons from "@expo/vector-icons";
import * as firebase from "firebase";

export default class RegisterScreen extends React.Component {
  static navigationOptions = {
    headerShown: false
  };
  state = {
    name: "",
    email: "",
    password: "",
    errorMessage: null
  };

  handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(userCredentials => {
        return userCredentials.user.updateProfile({
          displayName: this.state.name
        });
      })
      .catch(error => this.setState({ errorMessage: error.message }));
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Image
          source={require("../assets/header.png")}
          style={{
            height: 400,
            width: 400,
            marginTop: -200,
            marginLeft: -100,
            marginBottom: -30
          }}
        />
        <TouchableOpacity
          style={styles.back}
          onPress={() => this.props.navigation.goBack()}
        >
          <Ionicons name="ios-arrow-round-back" size={32} color="#FFF" />
        </TouchableOpacity>
        <View
          style={{
            position: "absolute",
            top: 64,
            alignItems: "center",
            width: "100%"
          }}
        >
          <Text style={styles.greeting}>{"Registrate!"}.</Text>
          <TouchableOpacity style={styles.avatar}>
            <Ionicons name="ios-add" size={40} color="#FFF"></Ionicons>
          </TouchableOpacity>
        </View>
        <View style={styles.errorMessage}>
          {this.state.errorMessage && (
            <Text style={styles.error}>{this.state.errorMessage}</Text>
          )}
        </View>

        <View style={styles.form}>
          <View>
            <Text style={styles.inputTitle}>Full name</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              onChangeText={name =>
                this.setState({
                  name
                })
              }
              value={this.state.name}
            />
          </View>
          <View style={{ marginTop: 32 }}>
            <Text style={styles.inputTitle}>Email Address</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              onChangeText={email =>
                this.setState({
                  email
                })
              }
              value={this.state.email}
            />
          </View>
          <View style={{ marginTop: 32 }}>
            <Text style={styles.inputTitle}>Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              autoCapitalize="none"
              onChangeText={password =>
                this.setState({
                  password
                })
              }
              value={this.state.password}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
          <Text
            style={{
              color: "#FFF",
              fontWeight: "500"
            }}
          >
            Registrate
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            alignSelf: "center",
            marginTop: 20
          }}
          onPress={() => this.props.navigation.navigate("Login")}
        >
          <Text
            style={{
              color: "#414959",
              fontSize: 13
            }}
          >
            ¿Ya tenes una cuenta?{" "}
            <Text
              style={{
                color: "#009372",
                fontWeight: "500"
              }}
            >
              Loggeate
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  greeting: {
    marginTop: 32,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center"
  },
  errorMessage: {
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30
  },
  error: {
    color: "#E9446A",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center"
  },
  form: {
    marginBottom: 10,
    marginHorizontal: 30
  },
  inputTitle: {
    color: "#8A8F9E",
    fontSize: 10,
    textTransform: "uppercase"
  },
  input: {
    borderBottomColor: "#8A8F9E",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: "#161F3D"
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: "#009372",
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center"
  },
  back: {
    position: "absolute",
    top: 30,
    left: 32,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(21, 22, 48, 0.1)",
    alignItems: "center",
    justifyContent: "center"
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#E1E2E6",
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center"
  }
});
