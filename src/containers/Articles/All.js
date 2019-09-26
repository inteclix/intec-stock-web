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
    store.articleStore.getAll();
    store.articleStore.selectedId = 0;
  }
  delete(id) {
    if (window.confirm("Do you delete that User?")) {
      store.articleStore.delete(id);
    }
  }
  render() {
    if (store.articleStore.loading) {
      return (
        <View style={[globalStyles.container, { justifyContent: "center" }]}>
          <ActivityIndicator size={48} />
        </View>
      );
    }
    if (store.articleStore.articles.length === 0) {
      return (
        <View style={globalStyles.container}>
          <Text>Il ya aucun articles</Text>
        </View>
      );
    }
    return (
      <View style={globalStyles.container}>
        <View style={globalStyles.header}>
          <TextInput
            placeholder="Rechercher un article ..."
            style={globalStyles.searchInput}
            value={store.articleStore.textSearch}
            onChange={(e)=> store.articleStore.textSearch = e.target.value}
          />
        </View>

        <ScrollView>
          <View style={globalStyles.cards}>
            {store.articleStore.articles.filter((article)=> {
              if(article.code.includes(store.articleStore.textSearch)) return article
              if(article.designation.includes(store.articleStore.textSearch)) return article
            }).map((article, index) => (
              <Card
                key={index}
                isSelected={store.articleStore.selectedId === article.id}
                onDelete={() => this.delete(article.id)}
                onEdit={() =>
                  this.props.history.push("/articles/edit/" + article.id)
                }
                onPress={() => {
                  store.articleStore.selectedId = article.id;
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

export default observer(All);
/*

 */