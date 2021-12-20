import { FormLabel as ChakraFormLabel } from '@chakra-ui/react';
import styles from './FormLabel.module.css';

const FormLabel = ({ children, label, errorMessage, name }) => {
  return (
    <>
      <ChakraFormLabel htmlFor={name}>{label}</ChakraFormLabel>
      {children}
      <div className={styles.label}>{errorMessage}</div>
    </>
  );
};

export default FormLabel;
