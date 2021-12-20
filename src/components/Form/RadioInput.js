import { Radio, RadioGroup, Stack } from '@chakra-ui/react';
import { useController } from 'react-hook-form';
import FormLabel from './FormLabel';

const RadioInput = ({ control, name, defaultValue = '', required, label, options }) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error }
  } = useController({
    name,
    control,
    rules: { required },
    defaultValue
  });

  return (
    <FormLabel label={label} name={name} errorMessage={error?.message}>
      <RadioGroup onChange={onChange} onBlur={onBlur} value={value} ref={ref}>
        <Stack direction="row">
          {options.map((option) => (
            <Radio isChecked={option.value === value} key={option.value} value={option.value}>
              {option.label}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
    </FormLabel>
  );
};

export default RadioInput;
