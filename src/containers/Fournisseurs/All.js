import React from "react";
import { observer } from "mobx-react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  ActivityIndicator
} from "react-native-web";

import store from "../../stores";

import { globalStyles } from "../../constants";
import Card from "../../components/Card";

class All extends React.Component {
  componentDidMount() {
    store.fournisseurStore.getAll();
    store.fournisseurStore.selectedId = 0;
  }
  delete(id) {
    if (window.confirm("Do you delete that User?")) {
      store.fournisseurStore.delete(id);
    }
  }
  render() {
    if (store.fournisseurStore.loading) {
      return (
        <View style={[globalStyles.container, { justifyContent: "center" }]}>
          <ActivityIndicator size={48} />
        </View>
      );
    }
    if (store.fournisseurStore.fournisseurs.length === 0) {
      return (
        <View style={globalStyles.container}>
          <Text>Il ya aucun fournisseurs</Text>
        </View>
      );
    }
    return (
      <View style={globalStyles.container}>
        <View style={globalStyles.header}>
          <TextInput
            placeholder="Rechercher un fournisseur ..."
            style={globalStyles.searchInput}
          />
        </View>
        <ScrollView>
          <View style={globalStyles.cards}>
            {store.fournisseurStore.fournisseurs.map((fournisseur, index) => (
              <Card
                key={index}
                isSelected={store.fournisseurStore.selectedId === fournisseur.id}
                onDelete={() => this.delete(fournisseur.id)}
                onEdit={() =>
                  this.props.history.push("/fournisseurs/edit/" + fournisseur.id)
                }
                onPress={() => {
                  store.fournisseurStore.selectedId = fournisseur.id;
                }}
              >
                <Text>{fournisseur.prenom.toUpperCase() + " " + fournisseur.nom}</Text>
              </Card>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default observer(All);
