import React from "react";
import { Route, withRouter } from "react-router-dom";
import { View } from "react-native-web";

import All from "./All";
import Add from "./Add";
import Edit from "./Edit";

import Link from "../../components/Link";
import Container from "../../components/Container";

import { globalStyles } from "../../constants";

const Achats = withRouter(({ history, location }) => (
  <Container title="Gestion des achats">
    <View style={globalStyles.links}>
      <Link
        text="Tous les achats"
        onPress={() => history.push("/achats")}
        isSelected={location.pathname === "/achats"}
      />
      <Link
        text="Ajouter un achat"
        onPress={() => history.push("/achats/add")}
        isSelected={location.pathname === "/achats/add"}
      />
    </View>
    <Route path="/achats" component={All} exact />
    <Route path="/achats/add" component={Add} exact />
    <Route path="/achats/edit/:id" component={Edit} />
  </Container>
));

export default Achats;
