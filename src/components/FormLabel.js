import { FormLabel as ChakraFormLabel } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';

const FormLabel = ({ required, children, ...props }) => {
  if (!children) return null;
  return (
    <ChakraFormLabel {...props}>
      {children} {required && <span className="required">*</span>}
    </ChakraFormLabel>
  );
};

FormLabel.propTypes = {
  required: PropTypes.bool,
  children: PropTypes.node
};

export default FormLabel;
