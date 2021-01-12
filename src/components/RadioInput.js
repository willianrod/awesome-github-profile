import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, Radio, RadioGroup } from '@chakra-ui/react';
import { wrapField } from '../helpers/form-helper';
import FormLabel from './FormLabel';

const RadioInput = ({ input: { onChange, value }, label, options = [], required, ...rest }) => {
  return (
    <FormControl>
      <FormLabel required={required}>{label}</FormLabel>
      <RadioGroup onChange={onChange} value={value} {...rest}>
        {options.map((option) => (
          <Radio isChecked={option.value === value} key={option.value} value={option.value}>
            {option.label}
          </Radio>
        ))}
      </RadioGroup>
    </FormControl>
  );
};

RadioInput.propTypes = {
  input: PropTypes.objectOf({
    onChange: PropTypes.func,
    value: PropTypes.string
  }),
  label: PropTypes.string,
  meta: PropTypes.objectOf({
    error: PropTypes.string,
    touched: PropTypes.bool
  }),
  required: PropTypes.bool,
  options: PropTypes.arrayOf({
    value: PropTypes.string,
    label: PropTypes.string
  })
};

export default wrapField(RadioInput);
