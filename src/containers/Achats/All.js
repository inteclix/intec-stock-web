import React from "react";
import { observer } from "mobx-react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  FlatList,
  ActivityIndicator
} from "react-native-web";

import store from "../../stores";

import { globalStyles } from "../../constants";
import Card from "../../components/Card";

class All extends React.Component {
  componentDidMount() {
    store.achatStore.getAll();
    store.achatStore.selectedId = 0;
  }
  delete(id) {
    if (window.confirm("Do you delete that User?")) {
      store.achatStore.delete(id);
    }
  }
  render() {
    if (store.achatStore.loading) {
      return (
        <View style={[globalStyles.container, { justifyContent: "center" }]}>
          <ActivityIndicator size={48} />
        </View>
      );
    }
    if (store.achatStore.achats.length === 0) {
      return (
        <View style={globalStyles.container}>
          <Text>Il ya aucun achats</Text>
        </View>
      );
    }
    return (
      <View style={globalStyles.container}>
        <View style={globalStyles.header}>
          <TextInput
            placeholder="Rechercher un achat ..."
            style={globalStyles.searchInput}
          />
        </View>

        <ScrollView>
          <View style={globalStyles.cards}>
            {store.achatStore.achats.map((achat, index) => (
              <Card
                key={index}
                isSelected={store.achatStore.selectedId === achat.id}
                onDelete={() => this.delete(achat.id)}
                onEdit={() =>
                  this.props.history.push("/achats/edit/" + achat.id)
                }
                onPress={() => {
                  store.achatStore.selectedId = achat.id;
                }}
              >
                <Text>Code: {achat.code}</Text>
                <Text>Designation: {achat.designation}</Text>
                <Text>Famille: {achat.Famille.name}</Text>
              </Card>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default observer(All);
/*

 */