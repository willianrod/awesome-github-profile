import { FormControl, Textarea } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { wrapField } from '../helpers/form-helper';
import FormLabel from './FormLabel';

const TextareaInput = ({ input: { onChange, value }, label, meta, required, ...rest }) => {
  return (
    <FormControl>
      <FormLabel required={required}>{label}</FormLabel>
      <Textarea
        isInvalid={meta.error && meta.touched}
        onChange={onChange}
        value={value}
        {...rest}
      />
    </FormControl>
  );
};

TextareaInput.propTypes = {
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
  })
};

export default wrapField(TextareaInput);
