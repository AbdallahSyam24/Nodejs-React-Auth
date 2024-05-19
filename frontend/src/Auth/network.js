import axios from 'axios';
axios.defaults.baseURL = "http://localhost:5001";

export async function loginAPI(user) {
    const url = "/login";
    try {
        const res = await axios.post(url, user);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function signupAPI(user) {
    const url = '/signup';
    try {
        const res = await axios.post(url, user);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function getProductsAPI() {
    const url = "/products";
    try {
        const res = await axios.get(url);
        return res.data;
        return res;
    } catch (error) {
        throw error;
    }
}