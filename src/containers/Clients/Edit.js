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
    store.clientStore.getClient(id);
  }

  render() {
    if (store.clientStore.loading) {
      return (
        <View style={[globalStyles.container, { justifyContent: "center" }]}>
          <ActivityIndicator size={48} />
        </View>
      );
    }
    return (
      <Form
        label="Sauvegarder pour modifier l'client"
        onSubmit={() => store.clientStore.update()}
      >
        <Form.Item required label="Nom">
          <TextInput
            value={store.clientStore.client.nom}
            onChangeText={text => (store.clientStore.client.nom = text)}
            placeholder="nom"
            style={globalStyles.textInput}
          />
        </Form.Item>

        <Form.Item required label="Prénom">
          <TextInput
            value={store.clientStore.client.prenom}
            onChangeText={text => (store.clientStore.client.prenom = text)}
            placeholder="prenom"
            style={globalStyles.textInput}
          />
        </Form.Item>

        <Form.Item label="Tel">
          <TextInput
            value={store.clientStore.client.tel}
            onChangeText={text => (store.clientStore.client.tel = text)}
            placeholder="Tel"
            style={globalStyles.textInput}
          />
        </Form.Item>

        <Form.Item label="Raison social">
          <TextInput
            value={store.clientStore.client.raison_social}
            onChangeText={text => (store.clientStore.client.raison_social = text)}
            placeholder="Raison social"
            style={globalStyles.textInput}
          />
        </Form.Item>

        <Form.Item label="Solde initiale">
          <TextInput
            value={store.clientStore.client.solde}
            onChangeText={text => (store.clientStore.client.solde = text)}
            placeholder="solde"
            style={globalStyles.textInput}
          />
        </Form.Item>
      </Form>
    );
  }
}

export default observer(Add);
