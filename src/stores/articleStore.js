import { observable, action, decorate } from "mobx";

import agent from "../agent";
import toastStore from "./toastStore";

class ArticleStore {
  loadingUser = false;
  updatingUser = false;
  selectedId = 0;
  updatingUserErrors;
  article = {
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
  };
  articles = [];
  loading = false;
  message = {
    type: "",
    body: "",
    show: false
  };
  textSearch=""

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
    return agent.Articles.all()
      .then(response => {
        return response.data;
      })
      .then(
        action(data => {
          this.articles = data;
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
    return agent.Articles.create(this.article)
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

  getArticle(id) {
    this.loading = true;
    return agent.Articles.getArticle(id)
      .then(response => {
        return response.data;
      })
      .then(
        action(data => {
          this.article = data;
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
    return agent.Articles.delete(id)
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
    return agent.Articles.update(this.article)
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

ArticleStore = decorate(ArticleStore, {
  selectedId: observable,
  article: observable,
  articles: observable,
  loading: observable,
  message: observable,
  textSearch: observable
});

export default new ArticleStore();
