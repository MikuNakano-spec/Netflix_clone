import * as yup from 'yup';

//Đăng nhập validation
const LoginValidation = yup.object().shape({
    email: yup.string().email().required("Email is required").trim(),
    password: yup.string().required("Password is required").min(3, "Password must be atleast 3 characters").max(20, "Password must be less than 20 characters")
});

//Đăng ký validation
const RegisterValidation = yup.object().shape({
    email: yup.string().email().required("Email is required").trim(),
    password: yup.string().required("Password is required").min(3, "Password must be atleast 3 characters").max(20, "Password must be less than 20 characters"),
    fullName: yup.string().required("FullName is required").max(20, "FullName must be less than 20 characters"),
});

//Profile validation
const ProfileValidation = yup.object().shape({
    fullName: yup.string().required("FullName is required").max(20, "FullName must be less than 20 characters"),
    email: yup.string().email().required("Email is required").trim(),
});

//Mật khẩu validation 
const PasswordValidation = yup.object().shape({
    oldPassword: yup
        .string()
        .required("Password is required")
        .min(3, "Password must be at least 3 characters")
        .max(20, "Password must be at most 20 characters"),
    newPassword: yup
        .string()
        .required("Password is required")
        .min(3, "Password must be at least 3 characters")
        .max(20, "Password must be at most 20 characters"),
    confirmPassword: yup
        .string()
        .required("Password is required")
        .min(3, "Password must be at least 3 characters")
        .max(20, "Password must be at most 20 characters")
        .oneOf([yup.ref("newPassword"), null], "Password must match"),
});



export { LoginValidation, RegisterValidation, ProfileValidation, PasswordValidation };