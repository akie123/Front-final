import * as yup from "yup";


export const userSchema = yup.object().shape({

    password: yup.string()
        .required("Password is required")
        .min(6, "Password is too short - should be 6 chars minimum"),
    passwordr: yup.string().required("Password is required")
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
    number: yup.string()
        .required("Phone number is required")
        .matches(
            /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
            "Invalid phone number"
        ),
    check: yup.bool()
        .oneOf([true], "You must accept the terms and conditions")
})