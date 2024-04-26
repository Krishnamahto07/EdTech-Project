const BASE_URL = process.env.REACT_APP_BASE_URL
// console.log("BASE_URL ",BASE_URL);
// const BASE_URL = 'localhost:3000/api/v1'

export const categories = {
    CATEGORIES_API : BASE_URL + "/course/showAllCategories"
};

export const endpoints = {
    LOGIN_API : process.env.REACT_APP_BASE_URL+"/auth/login",
    SENDOTP_API : process.env.REACT_APP_BASE_URL+"/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}
