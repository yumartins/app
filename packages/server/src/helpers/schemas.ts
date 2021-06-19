import * as Yup from 'yup';

const schemas = {
  name: Yup.string().required('The name is required.'),
  email: Yup.string().required('The email is required.'),
  password: Yup.string().required('Password is required.'),
  document: Yup.string().required('The document is required (CPF or CNPJ).'),
};

export default schemas;
