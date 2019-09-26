import React from "react";
import { Route, withRouter } from "react-router-dom";
import { View } from "react-native-web";

import Link from "../../components/Link";
import Container from "../../components/Container";

import { globalStyles } from "../../constants";

const Ventes = withRouter(({ history, location }) => (
  <Container title="Gestion des clients">
    <View style={globalStyles.links}>
      <Link
        text="Nauveau vente"
        onPress={() => history.push("/ventes/create")}
        isSelected={location.pathname === "/ventes/create"}
      />
      <Link
        text="Ajouter un client"
        onPress={() => history.push("/clients/add")}
        isSelected={location.pathname === "/clients/add"}
      />
    </View>

    <View style={globalStyles.container}>
        <View style={globalStyles.header}>
          <TextInput
            placeholder="Rechercher un client ..."
            style={globalStyles.searchInput}
          />
        </View>
          
      </View>
  </Container>
));

export default Ventes;
