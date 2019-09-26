import React from "react";
import { Route, withRouter } from "react-router-dom";
import { View } from "react-native-web";

import All from "./All";
import Add from "./Add";
import Edit from "./Edit";

import Link from "../../components/Link";
import Container from "../../components/Container";

import { globalStyles } from "../../constants";

const Articles = withRouter(({ history, location }) => (
  <Container title="Gestion des articles">
    <View style={globalStyles.links}>
      <Link
        text="Tous les articles"
        onPress={() => history.push("/articles")}
        isSelected={location.pathname === "/articles"}
      />
      <Link
        text="Ajouter un article"
        onPress={() => history.push("/articles/add")}
        isSelected={location.pathname === "/articles/add"}
      />
    </View>
    <Route path="/articles" component={All} exact />
    <Route path="/articles/add" component={Add} exact />
    <Route path="/articles/edit/:id" component={Edit} />
  </Container>
));

export default Articles;
