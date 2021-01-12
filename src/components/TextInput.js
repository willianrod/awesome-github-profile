import { FormControl, Input } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { wrapField } from '../helpers/form-helper';
import FormLabel from './FormLabel';

const ToggleInput = ({ input: { onChange, value }, label, meta, required, disabled, ...rest }) => {
  return (
    <FormControl>
      <FormLabel required={required}>{label}</FormLabel>
      <Input
        isInvalid={meta.error && meta.touched}
        onChange={onChange}
        value={value}
        isDisabled={disabled}
        {...rest}
      />
    </FormControl>
  );
};

ToggleInput.propTypes = {
  input: PropTypes.objectOf({
    onChange: PropTypes.func,
    value: PropTypes.string
  }),
  label: PropTypes.string,
  meta: PropTypes.objectOf({
    error: PropTypes.string,
    touched: PropTypes.bool
  }),
  name: PropTypes.string,
  required: PropTypes.bool,
  length: PropTypes.number,
  options: PropTypes.arrayOf({
    value: PropTypes.string,
    label: PropTypes.string
  }),
  disabled: PropTypes.bool
};

export default wrapField(ToggleInput);
