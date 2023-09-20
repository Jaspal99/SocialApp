import React from 'react';
import PropTypes from 'prop-types';
import {Text} from 'react-native';
import style from './Style';
export default function Title(props) {
  return <Text style={style.title}>{props.title}</Text>;
}
Title.propTypes = {
  title: PropTypes.string.isRequired,
};
