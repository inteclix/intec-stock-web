import React from "react";
import { observer } from "mobx-react";
import {
  TextInput,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Picker,
  Button as BButton
} from "react-native-web";
import { FaPencilAlt, FaTrashAlt, FaPlus } from "react-icons/fa";

import ReactAutocomplete from "react-autocomplete";

import { globalStyles, colors } from "../../constants";
import Card, { Button } from "../../components/Card";

import store from "../../stores";
//import stores from "../../stores";

import InputSearch from "../../components/InputSearch";

const Row = observer(({ article, onDelete }) => (
  <View
    style={{
      height: 32,
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      borderBottomWidth: 1,
      borderBottomColor: "#e9ebee"
    }}
  >
    <View style={{ flex: 1, flexDirection: "row" }}>
      <TextInput style={{ flex: 1 }} value={article.code} />
      <TextInput style={{ flex: 1 }} value={article.designation} />
      <TextInput
        onChangeText={text => (article.qte = text)}
        style={{ flex: 1 }}
        value={article.qte}
        keyboardType="numeric"
      />
      <TextInput
        onChangeText={text => {
          article.prix_achat = text;
          article.prix_vente = text * 2;
        }}
        style={{ flex: 1 }}
        value={article.prix_achat}
        keyboardType="numeric"
      />
      <TextInput
        onChangeText={text => (article.prix_vente = text)}
        style={{ flex: 1 }}
        value={article.prix_vente}
        keyboardType="numeric"
      />
    </View>
    <View style={{ width: 48 }}>
      <Button onPress={onDelete}>
        <FaTrashAlt color={colors.red} size={16} />
      </Button>
    </View>
  </View>
));

const Rows = observer(({ articles }) => (
  <ScrollView style={{ flex: 1 }}>
    {articles.map((article, index) => (
      <Row
        key={index}
        onDelete={() => store.achatStore.achat.articles.remove(article)}
        article={article}
      />
    ))}
  </ScrollView>
));

class Add extends React.Component {
  componentDidMount() {
    store.achatStore.achat = {
      id: 0,
      fournisseurId: 0,
      userId: store.userStore.currentUser.id,
      versement: 0,
      state: "en attente",
      articles: [],
      created_at: null,
      updated_at: null
    };
    store.articleStore.getAll();
    store.fournisseurStore.getAll();
  }
  addArticle = (value, item) => {
    let exist = false;
    for (let i = 0; i < store.achatStore.achat.articles.length; i++) {
      if (store.achatStore.achat.articles[i].code === item.code) exist = true;
    }
    if (!exist) store.achatStore.achat.articles.push({ ...item });
    //console.log(item);
  };
  render() {
    if (
      store.fournisseurStore.loading ||
      store.articleStore.loading ||
      store.achatStore.loading
    ) {
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
            flexDirection: "row",
            height: 48,
            backgroundColor: colors.gray,
            padding: 10,
            borderBottomWidth: 1,
            borderBottomColor: "white",
            zIndex: 99999
          }}
        >
          <View
            style={{
              flexDirection: "row",
              height: 48
            }}
          >
            <Button
              onPress={() => {
                console.log("add article");
              }}
            >
              <FaPlus color={"green"} size={16} />
            </Button>

            <ReactAutocomplete
              onKeyPress={() => console.log("sdsds")}
              inputProps={{
                style: { width: 300, height: 20, borderColor: "lightgray" },
                onKeyDown: e => {
                  if (e.keyCode === 13) {
                    console.log(
                      "new article: " + store.achatStore.autocompleteValue
                    );
                  }
                }
              }}
              items={store.articleStore.articles}
              shouldItemRender={(item, value) =>
                item.code.toLowerCase().indexOf(value.toLowerCase()) > -1
              }
              getItemValue={item => item.code}
              renderItem={(item, highlighted) => (
                <View
                  key={item.id}
                  style={{
                    backgroundColor: highlighted ? "#eee" : "transparent",
                    padding: 3
                  }}
                >
                  <Text>{"code: " + item.code} </Text>
                  <Text>{"designation: " + item.designation} </Text>
                </View>
              )}
              value={store.achatStore.autocompleteValue}
              onChange={e =>
                (store.achatStore.autocompleteValue = e.target.value)
              }
              onSelect={this.addArticle}
            />
          </View>

          <Picker
            onValueChange={(itemValue, itemIndex) =>
              (store.achatStore.achat.fournisseurId = itemValue)
            }
          >
            <Picker.Item value={0} label={"Fournisseur"} />
            {store.fournisseurStore.fournisseurs.map((fournisseur, index) => (
              <Picker.Item
                value={fournisseur.id}
                label={fournisseur.nom + " " + fournisseur.prenom}
              />
            ))}
          </Picker>
        </View>

        <View style={{ flex: 1 }}>
          <View
            style={{ flexDirection: "row", alignItems: "center", height: 32 }}
          >
            <Text style={{ flex: 1 }}>Code</Text>
            <Text style={{ flex: 1 }}>Designation</Text>
            <Text style={{ flex: 1 }}>Qte</Text>
            <Text style={{ flex: 1 }}>Prix achat</Text>
            <Text style={{ flex: 1 }}>Prix vente</Text>
            <Text style={{ width: 48 }} />
          </View>
          <Rows articles={store.achatStore.achat.articles} />
          <View
            style={{
              flexDirection: "row",
              height: 48,
              justifyContent: "space-around",
              alignItems: "center"
            }}
          >
            <Text>Total= {store.achatStore.totalAchat}</Text>
            <BButton
              title="Sauvgarder"
              onPress={() => store.achatStore.create()}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default observer(Add);
