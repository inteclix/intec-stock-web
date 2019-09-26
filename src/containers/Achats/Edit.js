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
    store.achatStore.getAchat(id);
  }

  render() {
    if (store.achatStore.loading) {
      return (
        <View style={[globalStyles.container, { justifyContent: "center" }]}>
          <ActivityIndicator size={48} />
        </View>
      );
    }
    return (
      <Form
        label="Sauvegarder pour modifier l'achat"
        onSubmit={() => store.achatStore.update()}
      >
        <Form.Item required label="Code de l'achat">
          <TextInput
            value={store.achatStore.achat.code}
            onChangeText={text => (store.achatStore.achat.code = text)}
            placeholder="Code"
            style={globalStyles.textInput}
          />
        </Form.Item>

        <Form.Item label="Designation">
          <TextInput
            value={store.achatStore.achat.designation}
            onChangeText={text => (store.achatStore.achat.designation = text)}
            placeholder="Designation"
            style={globalStyles.textInput}
          />
        </Form.Item>

        <Form.Item label="Prix achat">
          <TextInput
            value={store.achatStore.achat.prix_achat}
            onChangeText={text => (store.achatStore.achat.prix_achat = text)}
            placeholder="Prix achat"
            style={globalStyles.textInput}
          />
        </Form.Item>

        <Form.Item label="Prix vente">
          <TextInput
            value={store.achatStore.achat.prix_vente}
            onChangeText={text => (store.achatStore.achat.prix_vente = text)}
            placeholder="Prix vente"
            style={globalStyles.textInput}
          />
        </Form.Item>
      </Form>
    );
  }
}

export default observer(Add);
