import React from "react";
import { observer } from "mobx-react";
import { BrowserRouter, Route } from "react-router-dom";
import {
  Button,
  Image,
  StyleSheet,
  ActivityIndicator,
  View
} from "react-native-web";
import Login from "./containers/Login";
import Header from "./containers/Header";
import Container from "./components/Container";
import Users from "./containers/Users";
import ToastContainer from "./containers/Toast";
import { colors } from "./constants";

import stores from "./stores";
import AppUser from "./AppUser";
import AppAdmin from "./AppAdmin";

window.stores = stores;

class App extends React.Component {
  componentWillMount() {
    stores.userStore.me();
  }
  render() {
    if (stores.userStore.loadingUser) {
      return (
        <View style={styles.container}>
          <Container style={{ justifyContent: "center" }}>
            <ActivityIndicator size={48} />
          </Container>
        </View>
      );
    }
    if (stores.userStore.currentUser.username === "") {
      return (
        <View style={styles.container}>
          <Login />
          <ToastContainer />
        </View>
      );
    }
    if (stores.userStore.currentUser.isAdmin === 1) {
      return <AppAdmin />;
    } else
    {
      return <AppUser />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.darkGray,
    flex: 1,
  }
});

export default observer(App);
