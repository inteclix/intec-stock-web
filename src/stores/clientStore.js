import { observable, action, decorate } from "mobx";

import agent from "../agent";
import toastStore from "./toastStore";

class ClientStore {
  loadingUser = false;
  updatingUser = false;
  selectedId = 0;
  updatingUserErrors;
  client = {
    id: 0,
    nom: "",
    prenom: "",
    tel: "",
    solde: 0,
    type: 0,
    raison_social: ""
  };
  clients = [];
  loading = false;
  message = {
    type: "",
    body: "",
    show: false
  };

  hideMessage() {
    this.message = {
      type: "",
      body: "",
      show: false
    };
  }

  showMessage(message) {
    this.message = message;
  }

  getAll() {
    this.loading = true;
    return agent.Clients.all()
      .then(response => {
        return response.data;
      })
      .then(
        action(data => {
          this.clients = data;
        })
      )
      .catch(error => {
        let body =
          error.response !== undefined
            ? error.response.data.message
            : error.message;
        toastStore.error(body);
      })
      .finally(
        action(() => {
          this.loading = false;
        })
      );
  }

  create() {
    this.loading = true;
    return agent.Clients.create(this.client)
      .then(response => {
        return response.data;
      })
      .then(
        action(data => {
          toastStore.success(data.message);
        })
      )
      .catch(error => {
        let body =
          error.response !== undefined
            ? error.response.data.message
            : error.message;
        toastStore.error("Error verify your input data");
      })
      .finally(
        action(() => {
          this.loading = false;
          //commonStore.history.push('/companies')
        })
      );
  }

  getClient(id) {
    this.loading = true;
    return agent.Clients.getClient(id)
      .then(response => {
        return response.data;
      })
      .then(
        action(data => {
          this.client = data;
        })
      )
      .catch(error => {
        let body =
          error.response !== undefined
            ? error.response.data.message
            : error.message;
        this.showMessage({
          type: "error",
          body: body,
          show: true
        });
      })
      .finally(
        action(() => {
          this.loading = false;
        })
      );
  }

  delete(id) {
    this.loading = true;
    return agent.Clients.delete(id)
      .then(response => {
        return response.data;
      })
      .then(
        action(data => {
          toastStore.success(data.message);
        })
      )
      .catch(error => {
        let body =
          error.response !== undefined
            ? error.response.data.message
            : error.message;
        toastStore.error(body);
      })
      .finally(action(() => this.getAll()));
  }

  update() {
    this.loading = true;
    return agent.Clients.update(this.client)
      .then(response => {
        return response.data;
      })
      .then(
        action(data => {
          toastStore.success(data.message);
        })
      )
      .catch(error => {
        let body =
          error.response !== undefined
            ? error.response.data.message
            : error.message;
        toastStore.error("Error verify your input data");
      })
      .finally(
        action(() => {
          this.loading = false;
          //commonStore.history.push('/companies')
        })
      );
  }

  forgetUser() {
    this.currentUser = undefined;
  }
}

ClientStore = decorate(ClientStore, {
  selectedId: observable,
  client: observable,
  clients: observable,
  loading: observable,
  message: observable,
});

export default new ClientStore();
