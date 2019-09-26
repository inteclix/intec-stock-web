import React from "react"
import PropTypes from 'prop-types'

import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet
} from 'react-native-web'

import { globalStyles } from "../constants";

class Table extends React.Component{
  render(){
    const data = this.props
    return(
      <View style={globalStyles.container}>
        <View style={globalStyles.header}>
          <TextInput
            placeholder="Rechercher un personne ..."
            style={globalStyles.searchInput}
          />
        </View>
        <ScrollView>
          <View style={globalStyles.cards}>
            {data.map((item, index) => (
              <Card
                key={index}
                onDelete={() => this.props.delete(item.id)}
                onEdit={() =>
                  this.props.history.push("/personnes/edit/" + personne.id)
                }
              >
                <Text>{personne.prenom.toUpperCase() + " " + personne.nom}</Text>
              </Card>
            ))}
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default Table