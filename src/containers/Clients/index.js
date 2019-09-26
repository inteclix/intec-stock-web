import React from "react";
import { Route, withRouter } from "react-router-dom";
import { View } from "react-native-web";

import All from "./All";
import Add from "./Add";
import Edit from "./Edit";

import Link from "../../components/Link";
import Container from "../../components/Container";

import { globalStyles } from "../../constants";

const Clients = withRouter(({ history, location }) => (
  <Container title="Gestion des clients">
    <View style={globalStyles.links}>
      <Link
        text="Tous les clients"
        onPress={() => history.push("/clients")}
        isSelected={location.pathname === "/clients"}
      />
      <Link
        text="Ajouter un client"
        onPress={() => history.push("/clients/add")}
        isSelected={location.pathname === "/clients/add"}
      />
    </View>
    <Route path="/clients" component={All} exact />
    <Route path="/clients/add" component={Add} exact />
    <Route path="/clients/edit/:id" component={Edit} />
  </Container>
));

export default Clients;
