import React from "react";
import { observer } from "mobx-react";
import { BrowserRouter, Route } from "react-router-dom";

import { View, StyleSheet } from "react-native-web";
import Header from "./containers/Header";
import ToastContainer from "./containers/Toast";

import { colors } from "./constants";

import Users from "./containers/Users";
import Articles from "./containers/Articles";
import Fournisseurs from "./containers/Fournisseurs";
import Clients from "./containers/Clients";
import Achats from "./containers/Achats";

class AppAdmin extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <View style={styles.container}>
          <Header />
          <Route path={"/users"} component={Users} />
          <Route path={"/articles"} component={Articles} />
          <Route path={"/clients"} component={Clients} />
          <Route path={"/fournisseurs"} component={Fournisseurs} />
          <ToastContainer />
        </View>
      </BrowserRouter>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.darkGray,
    flex: 1
  }
});

export default observer(AppAdmin);
