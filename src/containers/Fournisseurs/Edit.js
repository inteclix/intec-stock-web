import React from "react";
import { observer } from "mobx-react";
import {
  TextInput,
  Picker,
  View,
  ActivityIndicator,
  Text
} from "react-native-web";
import { globalStyles } from "../../constants";
import Form from "../../components/Form";

import store from "../../stores";

class Add extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    store.fournisseurStore.getFournisseur(id);
  }

  render() {
    if (store.fournisseurStore.loading) {
      return (
        <View style={[globalStyles.container, { justifyContent: "center" }]}>
          <ActivityIndicator size={48} />
        </View>
      );
    }
    return (
      <Form
        label="Sauvegarder pour modifier l'fournisseur"
        onSubmit={() => store.fournisseurStore.update()}
      >
        <Form.Item required label="Nom">
          <TextInput
            value={store.fournisseurStore.fournisseur.nom}
            onChangeText={text => (store.fournisseurStore.fournisseur.nom = text)}
            placeholder="nom"
            style={globalStyles.textInput}
          />
        </Form.Item>

        <Form.Item required label="Prénom">
          <TextInput
            value={store.fournisseurStore.fournisseur.prenom}
            onChangeText={text => (store.fournisseurStore.fournisseur.prenom = text)}
            placeholder="prenom"
            style={globalStyles.textInput}
          />
        </Form.Item>

        <Form.Item label="Tel">
          <TextInput
            value={store.fournisseurStore.fournisseur.tel}
            onChangeText={text => (store.fournisseurStore.fournisseur.tel = text)}
            placeholder="Tel"
            style={globalStyles.textInput}
          />
        </Form.Item>

        <Form.Item label="Raison social">
          <TextInput
            value={store.fournisseurStore.fournisseur.raison_social}
            onChangeText={text => (store.fournisseurStore.fournisseur.raison_social = text)}
            placeholder="Raison social"
            style={globalStyles.textInput}
          />
        </Form.Item>

        <Form.Item label="Solde initiale">
          <TextInput
            value={store.fournisseurStore.fournisseur.solde}
            onChangeText={text => (store.fournisseurStore.fournisseur.solde = text)}
            placeholder="solde"
            style={globalStyles.textInput}
          />
        </Form.Item>
      </Form>
    );
  }
}

export default observer(Add);
