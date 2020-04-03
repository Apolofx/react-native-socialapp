import React from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import Fire from "../Fire";
import * as ImagePicker from "expo-image-picker";
// import { ScrollView } from "react-native-gesture-handler";
const firebase = require("firebase");
require("firebase/firestore");

export default class PostScreen extends React.Component {
  state = {
    text: "",
    image: ""
  };

  componentDidMount() {
    this.getPhotoPermission();
  }

  getPhotoPermission = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      if (status != "granted") {
        alert("We need permission to acces your camera roll");
      }
    }
  };

  handlePost = async () => {
    Fire.shared
      .addPost({
        text: this.state.text.trim(),
        localUri: this.state.image
      })
      .then(ref => {
        this.setState({ text: "", image: "" });
        this.props.navigation.goBack();
      })
      .catch(error => {
        alert(error);
      });
  };

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3]
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Ionicons
                name="md-arrow-back"
                size={24}
                color="#D8D9DB"
              ></Ionicons>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{ fontWeight: "500" }} onPress={this.handlePost}>
                Post
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <Image
              source={require("../images/avatar.jpg")}
              style={styles.avatar}
            ></Image>
            <TextInput
              autoFocus={true}
              multiline={true}
              numberOfLines={4}
              style={{ flex: 1 }}
              placeholder="Want to share something?"
              onChangeText={text => this.setState({ text })}
              value={this.state.text}
            ></TextInput>
          </View>
          <TouchableOpacity style={styles.photo} onPress={this.pickImage}>
            <Ionicons name="md-camera" size={32} color="#D8D9DB"></Ionicons>
          </TouchableOpacity>
          <View style={{ marginHorizontal: 32, marginTop: 32, heigh: 150 }}>
            <Image
              source={this.state.image ? { uri: this.state.image } : null}
              style={{ width: "100%", height: "100%" }}
            ></Image>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#d8d9db"
  },
  inputContainer: {
    margin: 32,
    flexDirection: "row",
    alignItems: "center"
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16
  },
  photo: {
    alignItems: "flex-end",
    marginHorizontal: 32
  }
});
