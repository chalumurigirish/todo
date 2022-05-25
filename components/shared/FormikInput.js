import React from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useField } from 'formik';

const FormikInput = ({ label, ...props }) => {
  const [field, { error, touched }] = useField(props);

  return (
    <FormControl isInvalid={error && touched}>
      <FormLabel>{label}</FormLabel>
      <Input {...field} {...props} />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

export default FormikInput;
