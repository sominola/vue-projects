import * as yup from "yup";

export const signUpValidation = yup.object({
    email: yup.string()
        .required('Email is required')
        .email('Wrong email'),

    password: yup.string()
        .required('Password is required')
        .min(6, 'Min length is 6'),

    passwordConfirm: yup
        .string()
        .required('Password is required')
        .min(6, 'Min length is 6')
        .oneOf([yup.ref('password')], 'Passwords must be same'),
});