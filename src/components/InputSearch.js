import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput
} from "react-native-web"
import { observer } from "mobx-react";

import stores from '../stores'

import { colors, globalStyles } from "../constants";
import HandleClickOutside from "./HandleClickOutside"

class InputSearch extends Component {
  constructor(props){
    super(props)
    this.state = {
      textValue: "",
      showResults: false
    }
  }
  render() {
    const results = this.props.data.filter(article => article.code.includes(this.state.textValue))
    return (
      <View style={{ flex: 1 }}>
        <TextInput
          value={this.state.textValue}
          onChangeText={(text) => this.setState({...this.state, textValue: text})}
          placeholder="Rechercher un article ..."
          style={[globalStyles.searchInput, { width: 500 }]}
          ref={component => this._textInput = component}
          onFocus={() => this.setState({...this.state, showResults: true})}
        />
        {
          (this.state.showResults || (this._textInput && this._textInput.isFocused()))  &&
          <HandleClickOutside handleClick={() => this.setState({...this.state, showResults: false})}>
            <View style={{
              height: 200,
              width: "100%",
              top: 32,
              position: "absolute",
              backgroundColor: "white",
              padding: 5,
              borderRadius: 5,
              shadowColor: "black",
              shadowOffset: { width: 3, height: 3 },
              shadowOpacity: 0.5,
              shadowRadius: 10
            }}>
              {
                results.map((article, index) => (
                  <Text key={index}>{article.code}</Text>
                ))
              }
            </View>
          </HandleClickOutside>
        }
      </View>
    )
  }
}

InputSearch.propTypes = {

};

export default observer(InputSearch);
