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
    store.userStore.getUser(id);
  }

  render() {
    if (store.userStore.loading) {
      return (
        <View style={[globalStyles.container, { justifyContent: "center" }]}>
          <ActivityIndicator size={48} />
        </View>
      );
    }
    return (
      <Form
        label="Sauvegarder pour modifier l'utilisateur"
        onSubmit={() => store.userStore.update()}
      >
        <Form.Item required label="Nom de l'utilisateur">
          <TextInput
            value={store.userStore.user.username}
            onChangeText={text => (store.userStore.user.username = text)}
            placeholder="Nom"
            style={globalStyles.textInput}
          />
        </Form.Item>

        <Form.Item required label="Email de l'utilisateur">
          <TextInput
            value={store.userStore.user.email}
            onChangeText={text => (store.userStore.user.email = text)}
            placeholder="Email"
            style={globalStyles.textInput}
          />
        </Form.Item>

        <Form.Item label="N° Telephone">
          <TextInput
            value={store.userStore.user.tel}
            onChangeText={text => (store.userStore.user.tel = text)}
            placeholder="Telephone"
            style={globalStyles.textInput}
          />
        </Form.Item>

        <Form.Item label="Post de travail">
          <TextInput
            value={store.userStore.user.job}
            onChangeText={text => (store.userStore.user.job = text)}
            placeholder="Travail"
            style={globalStyles.textInput}
          />
        </Form.Item>

        <Form.Item required label="Mot de pass">
          <TextInput
            value={store.userStore.user.password}
            onChangeText={text => (store.userStore.user.password = text)}
            placeholder="Mot de pass"
            style={globalStyles.textInput}
          />
        </Form.Item>
      </Form>
    );
  }
}

export default observer(Add);
