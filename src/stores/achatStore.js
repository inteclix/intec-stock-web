import { observable, action, decorate, computed } from "mobx";

import agent from "../agent";
import toastStore from "./toastStore";

class AchatStore {
  autocompleteValue = "";
  selectedId = 0;
  achat = {
    id: 0,
    fournisseurId: 0,
    userId: 0,
    versement: 0,
    state: "en attente",
    articles: [],
    created_at: null,
    updated_at: null
  };

  achats = [];
  loading = false;
  message = {
    type: "",
    body: "",
    show: false
  };

  get totalAchat() {
    let total = 0;
    for (let i = 0; i < this.achat.articles.length; i++) {
      total += this.achat.articles[i].prix_achat * this.achat.articles[i].qte;
    }
    return total;
  }

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
    return agent.Achats.all()
      .then(response => {
        return response.data;
      })
      .then(
        action(data => {
          this.achats = data;
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
    return agent.Achats.create(this.achat)
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

  getAchat(id) {
    this.loading = true;
    return agent.Achats.getAchat(id)
      .then(response => {
        return response.data;
      })
      .then(
        action(data => {
          this.achat = data;
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
    return agent.Achats.delete(id)
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
    return agent.Achats.update(this.achat)
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
}

AchatStore = decorate(AchatStore, {
  autocompleteValue: observable,
  selectedId: observable,
  achat: observable,
  achats: observable,
  loading: observable,
  totalAchat: computed
});

export default new AchatStore();
