import axios from 'axios';
axios.defaults.baseURL = "http://localhost:5001";

export async function getProductsAPI() {
    const url = "/products";
    const token = JSON.parse(localStorage.getItem("user")).token;
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
        const res = await axios.get(url);
        if (res.data.success) {
            return res.data.data;
        }
        return null;
    } catch (error) {
        throw error;
    }
}

export async function addnewproductAPI(product) {
    const url = "/products";
    const token = JSON.parse(localStorage.getItem("user")).token;
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
        const res = await axios.post(url, product);
        return res.data.success;
    } catch (error) {
        throw error;
    }
}

export async function getProductByIDAPI(id) {
    const url = "/products/" + id;
    const token = JSON.parse(localStorage.getItem("user")).token;
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    try {
        const res = await axios.get(url);
        return res.data.data;
    } catch (error) {
        throw error;
    }
}

export async function editProductByIDAPI(id, updatedData) {
    const url = '/products/' + id;
    const token = JSON.parse(localStorage.getItem("user")).token;
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    try {
        const res = await axios.put(url, updatedData);
        return res.success;
    } catch (error) {
        throw error;
    }
}

export async function deleteProductByIDAPI(id) {
    const url = "/products/" + id;
    const token = JSON.parse(localStorage.getItem("user")).token;
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    try {
        const res = await axios.delete(url);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function getOpenAIAPI(prompt) {
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
    const apiUrl = 'https://api.openai.com/v1/engines/davinci/completions';

    const data = { ...prompt, max_tokens: 50 };

    const headers = {
        'Authorization': `Bearer ${apiKey}`,
    };

    try {
        const res = await axios.post(apiUrl, data, { headers });
        console.log(res);
        return res.data.choices[0].text;
    } catch (error) {
        throw error;
    }
}