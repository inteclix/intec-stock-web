import React from "react";
import PropTypes from "prop-types";

import { StyleSheet, View, TouchableOpacity } from "react-native-web";
import { colors, globalStyles } from "../constants";

import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

export const Button = ({onPress, children})=>(
  <TouchableOpacity onPress={onPress} style={globalStyles.cardButton}>
    {children}
  </TouchableOpacity>
)

const Card = ({ children, onPress, onEdit, onDelete, isSelected }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      globalStyles.card,
      {
        borderColor: isSelected ? colors.orange : colors.lightGray
      }
    ]}
  >
    <View style={globalStyles.cardBody}>{children}</View>
    <View style={globalStyles.cardButtons}>
      <Button onPress={onEdit} >
        <FaPencilAlt size={16} />
      </Button>
      <Button onPress={onDelete}>
        <FaTrashAlt color={colors.red} size={16} />
      </Button>
    </View>
  </TouchableOpacity>
);



Card.propTypes = {
  onPress: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired
};

export default Card;
