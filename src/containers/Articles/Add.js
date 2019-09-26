import React from "react";
import { observer } from "mobx-react";
import {
  TextInput,
  View,
  Text,
  ActivityIndicator,
  Picker
} from "react-native-web";

import { globalStyles } from "../../constants";
import Form from "../../components/Form";

import store from "../../stores";

class Add extends React.Component {
  componentDidMount() {
    store.articleStore.article = {
      id: 0,
      code: "",
      designation: "",
      prix_vente: 0.0,
      prix_vente_gros: 0.0,
      prix_achat: 0.0,
      qte: 0,
      familleId: 1,
      created_at: null,
      updated_at: null
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
    return (
      <Form
        label="Sauvegarder pour créer un nouvel article"
        onSubmit={() => store.articleStore.create()}
      >
        <Form.Item required label="Code de l'article">
          <TextInput
            value={store.articleStore.article.code}
            onChangeText={text => (store.articleStore.article.code = text)}
            placeholder="Code"
            style={globalStyles.textInput}
          />
        </Form.Item>

        <Form.Item label="Designation">
          <TextInput
            value={store.articleStore.article.designation}
            onChangeText={text => (store.articleStore.article.designation = text)}
            placeholder="Designation"
            style={globalStyles.textInput}
          />
        </Form.Item>

        <Form.Item label="Prix achat">
          <TextInput
            value={store.articleStore.article.prix_achat}
            onChangeText={text => (store.articleStore.article.prix_achat = text)}
            placeholder="Prix achat"
            style={globalStyles.textInput}
          />
        </Form.Item>

        <Form.Item label="Prix vente">
          <TextInput
            value={store.articleStore.article.prix_vente}
            onChangeText={text => (store.articleStore.article.prix_vente = text)}
            placeholder="Prix vente"
            style={globalStyles.textInput}
          />
        </Form.Item>

        <Form.Item label="Prix vente gros">
          <TextInput
            value={store.articleStore.article.prix_vente_gros}
            onChangeText={text => (store.articleStore.article.prix_vente_gros = text)}
            placeholder="Prix vente gros"
            style={globalStyles.textInput}
          />
        </Form.Item>
      </Form>
    );
  }
}

export default observer(Add);
