import { Textarea as ChakraTextArea } from '@chakra-ui/react';
import { useController } from 'react-hook-form';
import FormLabel from './FormLabel';

const TextArea = ({
  control,
  name,
  defaultValue = '',
  required,
  maxLength,
  minLength,
  label,
  placeholder
}) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { invalid, error }
  } = useController({
    name,
    control,
    rules: { required, maxLength, minLength },
    defaultValue
  });

  return (
    <FormLabel label={label} name={name} errorMessage={error?.message}>
      <ChakraTextArea
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        name={name}
        ref={ref}
        isInvalid={invalid}
        placeholder={placeholder}
      />
    </FormLabel>
  );
};

export default TextArea;
