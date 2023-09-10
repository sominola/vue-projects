import * as yup from "yup";

export const signInValidation = yup.object({
    email: yup.string()
        .required('Email is required')
        .email('Wrong email'),
    
    password: yup.string()
        .required('Password is required')
        .min(6, 'Min length is 6'),
});