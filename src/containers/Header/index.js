import React from "react";
import { observer } from "mobx-react";
import { withRouter } from "react-router";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native-web";
import {
  FaBars,
  FaHome,
  FaCube,
  FaFileAlt,
  FaCubes,
  FaUserFriends,
  FaUserAlt,
  FaUserTie,
  FaShippingFast,
  FaShoppingCart,
  FaRocket
} from "react-icons/fa";
import store from "../../stores";
import { colors } from "../../constants";
import HandleClickOutside from "../../components/HandleClickOutside";

const MenuProfile = withRouter(({ history }) => (
  <HandleClickOutside
    handleClick={() => (store.commonStore.showMenuProfile = false)}
  >
    <View style={styles.menuProfile}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          borderBottomWidth: 1,
          paddingBottom: 10
        }}
      >
        <FaUserAlt size={24} />
        <View>
          <Text>{store.userStore.currentUser.username}</Text>
          <Text>{store.userStore.currentUser.email}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          paddingBottom: 5,
          paddingTop: 10
        }}
      >
        <TouchableOpacity onPress={() => history.push("/settings")}>
          <Text>Paramètre</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => store.authStore.logout()}>
          <Text>Déconnecte</Text>
        </TouchableOpacity>
      </View>
    </View>
  </HandleClickOutside>
));

const Menu = withRouter(({ history, location }) => (
  <HandleClickOutside handleClick={() => (store.commonStore.showMenu = false)}>
    <View style={styles.menu}>
      <TouchableOpacity
        onPress={() => history.push("/")}
        style={[
          styles.menuItem,
          {
            borderColor:
              location.pathname === "/" ? colors.orange : colors.lightGray
          }
        ]}
      >
        <FaHome size={32} />
        <Text style={{ fontWeight: location.pathname === "/" ? "bold" : "" }}>
          Accueil
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => history.push("/users")}
        style={[
          styles.menuItem,
          {
            borderColor: location.pathname.startsWith("/users")
              ? colors.orange
              : colors.lightGray
          }
        ]}
      >
        <FaUserAlt size={32} />
        <Text
          style={{
            fontWeight: location.pathname.startsWith("/users") ? "bold" : ""
          }}
        >
          Utilisateurs
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => history.push("/articles")}
        style={[
          styles.menuItem,
          {
            borderColor: location.pathname.startsWith("/articles")
              ? colors.orange
              : colors.lightGray
          }
        ]}
      >
        <FaCubes size={32} />
        <Text
          style={{
            fontWeight: location.pathname.startsWith("/articles") ? "bold" : ""
          }}
        >
          Articles
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => history.push("/fournisseurs")}
        style={[
          styles.menuItem,
          {
            borderColor: location.pathname.startsWith("/fournisseurs")
              ? colors.orange
              : colors.lightGray
          }
        ]}
      >
        <FaUserTie size={32} />
        <Text
          style={{
            fontWeight: location.pathname.startsWith("/fournisseurs") ? "bold" : ""
          }}
        >
          Fournisseurs
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => history.push("/clients")}
        style={[
          styles.menuItem,
          {
            borderColor: location.pathname.startsWith("/clients")
              ? colors.orange
              : colors.lightGray
          }
        ]}
      >
        <FaUserFriends size={32} />
        <Text
          style={{
            fontWeight: location.pathname.startsWith("/clients") ? "bold" : ""
          }}
        >
          Clients
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => history.push("/ventes")}
        style={[
          styles.menuItem,
          {
            borderColor: location.pathname.startsWith("/ventes")
              ? colors.orange
              : colors.lightGray
          }
        ]}
      >
        <FaShoppingCart size={32} />
        <Text
          style={{
            fontWeight: location.pathname.startsWith("/ventes") ? "bold" : ""
          }}
        >
          Ventes
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => history.push("/achats")}
        style={[
          styles.menuItem,
          {
            borderColor: location.pathname.startsWith("/achats")
              ? colors.orange
              : colors.lightGray
          }
        ]}
      >
        <FaShippingFast size={32} />
        <Text
          style={{
            fontWeight: location.pathname.startsWith("/achats") ? "bold" : ""
          }}
        >
          Achats
        </Text>
      </TouchableOpacity>

      {store.userStore.currentUser.role === "superadmin" && (
        <TouchableOpacity
          onPress={() => history.push("/trackers")}
          style={[
            styles.menuItem,
            {
              borderColor: location.pathname.startsWith("/trackers")
                ? colors.orange
                : colors.lightGray
            }
          ]}
        >
          <FaRocket size={32} />
          <Text
            style={{
              fontWeight: location.pathname.startsWith("/trackers")
                ? "bold"
                : ""
            }}
          >
            Traqueurs
          </Text>
        </TouchableOpacity>
      )}
    </View>
  </HandleClickOutside>
));

class Header extends React.Component {
  toggleMenu() {
    store.commonStore.showMenu = true;
  }
  toggleMenuProfile() {
    store.commonStore.showMenuProfile = true;
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerLeft}>
          <TouchableOpacity style={styles.buttonMenu} onPress={this.toggleMenu}>
            <FaBars size={16} color="black" />
          </TouchableOpacity>
          {store.commonStore.showMenu && <Menu />}
          <TouchableOpacity onPress={() => this.props.history.push("/")}>
            <Text style={styles.title}>My-Stock</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={this.toggleMenuProfile}
            style={styles.buttonMenu}
          >
            <FaUserAlt size={16} color="black" />
          </TouchableOpacity>
          {store.commonStore.showMenuProfile && <MenuProfile />}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    zIndex: 99999,
    flexDirection: "row",
    height: 48,
    width: "100%",
    backgroundColor: colors.gray,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5
  },
  containerLeft: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 16
  },
  buttonMenu: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.gray,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10
  },
  menu: {
    flexDirection: "row",
    flexWrap: "wrap",
    position: "absolute",
    top: 45,
    left: 0,
    width: 316,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.gray,
    borderRadius: 3,
    padding: 5,
    shadowColor: "black",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 10
  },
  menuItem: {
    backgroundColor: colors.lightGray,
    alignItems: "center",
    borderWidth: 1,
    width: 96,
    height: 64,
    margin: 3,
    justifyContent: "space-around",
    borderRadius: 5,
    borderColor: colors.lightGray
  },
  menuProfile: {
    justifyContent: "space-between",
    position: "absolute",
    top: 45,
    right: 0,
    width: 250,
    backgroundColor: colors.gray,
    padding: 5,
    borderRadius: 5,
    shadowColor: "black",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 10
  }
});

export default withRouter(observer(Header));
