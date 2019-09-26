import React from "react";
import { Route, withRouter } from "react-router-dom";
import { View } from "react-native-web";

import All from "./All";
import Add from "./Add";
import Edit from "./Edit";

import Link from "../../components/Link";
import Container from "../../components/Container";

import { globalStyles } from "../../constants";

const Fournisseurs = withRouter(({ history, location }) => (
  <Container title="Gestion des fournisseurs">
    <View style={globalStyles.links}>
      <Link
        text="Tous les fournisseurs"
        onPress={() => history.push("/fournisseurs")}
        isSelected={location.pathname === "/fournisseurs"}
      />
      <Link
        text="Ajouter un fournisseur"
        onPress={() => history.push("/fournisseurs/add")}
        isSelected={location.pathname === "/fournisseurs/add"}
      />
    </View>
    <Route path="/fournisseurs" component={All} exact />
    <Route path="/fournisseurs/add" component={Add} exact />
    <Route path="/fournisseurs/edit/:id" component={Edit} />
  </Container>
));

export default Fournisseurs;
