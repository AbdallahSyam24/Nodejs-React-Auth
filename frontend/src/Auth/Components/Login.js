import { useNavigate } from "react-router";
import { useAuth } from "../useAuth";
import { useEffect, useState } from "react";
import { useLocalStorage } from "../useLocalStorage";
import Swal from 'sweetalert2';


export default function Login() {
    const { login } = useAuth();
    const { getItem } = useLocalStorage();
    const navigate = useNavigate();
    useEffect(() => {
        if (getItem("user")) {
            navigate('/');
        }
    }, []);

    const [inputs, setInputs] = useState({});

    const handelOnChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const handelSubmit = async (e) => {
        e.preventDefault();
        login(inputs)
            .then((res) => res.success
                ? navigate('/')
                : Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please check the email or the password'
                }))
            .catch((e) => console.log(e));
    };

    return (
        <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={handelSubmit}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign In</h3>
                    <div className="form-group mt-3">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control mt-1"
                            placeholder="Enter email"
                            name="email"
                            onChange={handelOnChange}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Enter password"
                            name="password"
                            onChange={handelOnChange}
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                    <p className="forgot-password text-right mt-2">
                        Don`t have
                        <span className="link-primary" style={{ cursor: "pointer" }} onClick={() => navigate('/signup')}> account?</span>
                    </p>
                </div>
            </form>
        </div>
    )
}
