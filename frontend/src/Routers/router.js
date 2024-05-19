import { createBrowserRouter } from 'react-router-dom';
import Home from '../Components/Home';
import ErrorPage from '../Components/404';
import Login from '../Auth/Components/Login';
import Signup from '../Auth/Components/Signup';
import Layout from '../Layout';
import AddNewProduct from '../Components/Products/AddNewProduct';
import EditProduct from '../Components/Products/EditProduct';
import OpenAI from '../Components/OpenAI';


const router = createBrowserRouter([
    {
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/addnewproduct',
                element: <AddNewProduct />
            },
            {
                path: '/editproduct',
                element: <EditProduct />
            },
            {
                path: '/openAI',
                element: <OpenAI />
            },
        ],
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/signup',
        element: <Signup />
    }
]);
export default router;