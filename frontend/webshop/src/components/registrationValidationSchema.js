import * as Yup from 'yup';

const registrationValidationSchema = Yup.object().shape({
  email: Yup.string().required('Email is required'),
  username: Yup.string().required('Username is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  name: Yup.string().required('Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  dateOfBirth: Yup.date()
    .required('Date of Birth is required')
    .min(new Date(new Date().getFullYear() - 100, 0, 1), 'You must be under 100 years old')
    .max(new Date(new Date().getFullYear() - 18, 11, 31), 'You must be at least 18 years old'),
  address: Yup.string().required('Address is required'),
  userType: Yup.string().required('User Type is required'),
});

export default registrationValidationSchema;
