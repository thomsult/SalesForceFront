import PropTypes from "prop-types";
import React, { createContext } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider(props) {
  const { children, value } = props;
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.shape({}).isRequired,
};
