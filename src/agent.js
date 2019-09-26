import axios from "axios";
import commonStore from "./stores/commonStore";

//const API_ROOT = 'https://geo-flota-server.herokuapp.com/api/';
const API_ROOT = "http://localhost:8080/api/";

let requests = axios.create({
  baseURL: API_ROOT,
  headers: {
    Authorization: `Bearer ${commonStore.token}`
  }
});

const Auth = {
  login: (username, password) =>
    requests.post("/login", { username, password }),
  me: () => requests.get("/me"),
  getUser: id => requests.get("/users/" + id),
  all: () => requests.get("/users"),
  create: user => requests.post("/users", { ...user }),
  delete: id => requests.delete("/users/" + id),
  update: user => requests.put("/users/" + user.id, { ...user })
};

const Articles = {
  getArticle: id => requests.get("/articles/" + id),
  all: () => requests.get("/articles"),
  create: article => requests.post("/articles", { ...article }),
  delete: id => requests.delete("/articles/" + id),
  update: article => requests.put("/articles/" + article.id, { ...article })
};

const Personnes = {
  getPersonne: id => requests.get("/personnes/" + id),
  all: () => requests.get("/personnes"),
  create: personne => requests.post("/personnes", { ...personne }),
  delete: id => requests.delete("/personnes/" + id),
  update: personne => requests.put("/personnes/" + personne.id, { ...personne })
};

const Clients = {
  getClient: id => requests.get("/clients/" + id),
  all: () => requests.get("/clients"),
  create: client => requests.post("/clients", { ...client }),
  delete: id => requests.delete("/clients/" + id),
  update: client => requests.put("/clients/" + client.id, { ...client })
};

const Fournisseurs = {
  getFournisseur: id => requests.get("/fournisseurs/" + id),
  all: () => requests.get("/fournisseurs"),
  create: fournisseur => requests.post("/fournisseurs", { ...fournisseur }),
  delete: id => requests.delete("/fournisseurs/" + id),
  update: fournisseur => requests.put("/fournisseurs/" + fournisseur.id, { ...fournisseur })
};

const Achats = {
  getAchats: id => requests.get("/achats/" + id),
  all: () => requests.get("/achats"),
  create: achat => requests.post("/achats", { ...achat }),
  delete: id => requests.delete("/achats/" + id),
  update: achat => requests.put("/achats/" + achat.id, { ...achat })
};

export default {
  Auth,
  Articles,
  Personnes,
  Clients,
  Fournisseurs,
  Achats
};
