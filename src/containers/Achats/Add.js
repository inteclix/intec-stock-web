import React from "react";
import { observer } from "mobx-react";
import {
  TextInput,
  View,
  Text,
  ActivityIndicator,
  ScrollView,

} from "react-native-web";

import { globalStyles, colors } from "../../constants";
import Card from "../../components/Card";

import store from "../../stores";
import stores from "../../stores";

import InputSearch from "../../components/InputSearch";


class Add extends React.Component {
  componentDidMount() {
    store.achatStore.achat = {
      id: 0,
      fournisseurId: 0,
      userId: 0,
      versement: 0,
      state: "en attente",
      articles: [],
      created_at: null,
      updated_at: null
    };
    store.articleStore.getAll()
  }

  render() {
    if (store.achatStore.loading || store.articleStore.loading) {
      return (
        <View style={[globalStyles.container, { justifyContent: "center" }]}>
          <ActivityIndicator size={48} />
        </View>
      );
    }
    return (
      <View style={globalStyles.container}>
        <View
          style={{
            justifyContent: "space-between",
            height: 48,
            backgroundColor: colors.gray,
            padding: 10,
            borderBottomWidth: 1,
            borderBottomColor: "white",
            zIndex: 99999
          }}>
          <InputSearch data={stores.articleStore.articles} />
        </View>

        <ScrollView>
          <View style={globalStyles.cards}>
            {store.achatStore.achat.articles.map((article, index) => (
              <Card
                key={index}
                onDelete={() => this.delete(article)}
                isSelected={false}
                onEdit={() =>
                  prompt("entre la qte de article")
                }
                onPress={() => {
                  // store.achatStore.selectedId = achat.id;
                }}
              >
                <Text>Code: {article.code}</Text>
                <Text>Designation: {article.designation}</Text>
                <Text>Famille: {article.Famille.name}</Text>
              </Card>
            ))}
          </View>
        </ScrollView>
      </View>

    );
  }
}

export default observer(Add);
