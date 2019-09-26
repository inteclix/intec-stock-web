import { observable, action, decorate } from "mobx";

import agent from "../agent";
import toastStore from "./toastStore";

class FournisseurStore {
  loadingUser = false;
  updatingUser = false;
  selectedId = 0;
  updatingUserErrors;
  fournisseur = {
    id: 0,
    nom: "",
    prenom: "",
    tel: "",
    solde: 0,
    type: 0,
    raison_social: ""
  };
  fournisseurs = [];
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
    return agent.Fournisseurs.all()
      .then(response => {
        return response.data;
      })
      .then(
        action(data => {
          this.fournisseurs = data;
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
    return agent.Fournisseurs.create(this.fournisseur)
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

  getFournisseur(id) {
    this.loading = true;
    return agent.Fournisseurs.getFournisseur(id)
      .then(response => {
        return response.data;
      })
      .then(
        action(data => {
          this.fournisseur = data;
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
    return agent.Fournisseurs.delete(id)
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
    return agent.Fournisseurs.update(this.fournisseur)
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

FournisseurStore = decorate(FournisseurStore, {
  selectedId: observable,
  fournisseur: observable,
  fournisseurs: observable,
  loading: observable,
  message: observable,
});

export default new FournisseurStore();
