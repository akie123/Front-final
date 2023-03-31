import * as Yup from 'yup';

const schema = Yup.object().shape({
    name: Yup.string()
        .required('Name is required')
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name can be at most 50 characters'),
    email: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
    dob: Yup.date()
        .required('Date of Birth is required')
        .max(new Date(), 'Date of Birth cannot be in the future'),
    city: Yup.string()
        .required('City is required')
        .min(2, 'City must be at least 2 characters')
        .max(50, 'City can be at most 50 characters'),
    state: Yup.string()
        .required('State is required')
        .min(2, 'State must be at least 2 characters')
        .max(50, 'State can be at most 50 characters'),
    gender: Yup.string()
        .required('Gender is required')
        .oneOf(['male', 'female', 'other'], 'Invalid gender')
});

export default schema;