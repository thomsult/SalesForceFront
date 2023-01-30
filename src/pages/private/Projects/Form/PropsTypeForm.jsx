import PropTypes from "prop-types";

export default {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired || PropTypes.number.isRequired,
};
