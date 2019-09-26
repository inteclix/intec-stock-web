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
    store.clientStore.getAll();
    store.clientStore.selectedId = 0;
  }
  delete(id) {
    if (window.confirm("Do you delete that User?")) {
      store.clientStore.delete(id);
    }
  }
  render() {
    if (store.clientStore.loading) {
      return (
        <View style={[globalStyles.container, { justifyContent: "center" }]}>
          <ActivityIndicator size={48} />
        </View>
      );
    }
    if (store.clientStore.clients.length === 0) {
      return (
        <View style={globalStyles.container}>
          <Text>Il ya aucun clients</Text>
        </View>
      );
    }
    return (
      <View style={globalStyles.container}>
        <View style={globalStyles.header}>
          <TextInput
            placeholder="Rechercher un client ..."
            style={globalStyles.searchInput}
          />
        </View>
        <ScrollView>
          <View style={globalStyles.cards}>
            {store.clientStore.clients.map((client, index) => (
              <Card
                key={index}
                isSelected={store.clientStore.selectedId === client.id}
                onDelete={() => this.delete(client.id)}
                onEdit={() =>
                  this.props.history.push("/clients/edit/" + client.id)
                }
                onPress={() => {
                  store.clientStore.selectedId = client.id;
                }}
              >
                <Text>{client.prenom.toUpperCase() + " " + client.nom}</Text>
              </Card>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default observer(All);
