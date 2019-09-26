import React from "react";
import { Route, withRouter } from "react-router-dom";
import { View } from "react-native-web";

import All from "./All";
import Add from "./Add";
import Edit from "./Edit";

import Link from "../../components/Link";
import Container from "../../components/Container";

import { globalStyles } from "../../constants";

const Users = withRouter(({ history, location }) => (
  <Container title="Gestion des utilisateurs">
    <View style={globalStyles.links}>
      <Link
        text="Tous les utilisateurs"
        onPress={() => history.push("/users")}
        isSelected={location.pathname === "/users"}
      />
      <Link
        text="Ajouter un utilisateur"
        onPress={() => history.push("/users/add")}
        isSelected={location.pathname === "/users/add"}
      />
    </View>
    <Route path="/users" component={All} exact />
    <Route path="/users/add" component={Add} exact />
    <Route path="/users/edit/:id" component={Edit} />
  </Container>
));

export default Users;
