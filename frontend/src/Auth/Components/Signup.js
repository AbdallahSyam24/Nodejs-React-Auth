import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useLocalStorage } from "../useLocalStorage";
import { signupAPI } from "../network";
import Swal from 'sweetalert2';

function isValidPassword(password) {
    console.log(password.length);
    if (password.length < 10) {
        return false;
    }

    if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password)) {
        return false;
    }

    if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
        return false;
    }

    return true;
}

export default function Signup() {
    const [inputs, setInputs] = useState({});
    const { getItem } = useLocalStorage();
    const navigate = useNavigate();

    useEffect(() => {
        if (getItem("user")) {
            navigate('/');
        }
    }, []);

    const handelOnChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const handelSubmit = (e) => {
        e.preventDefault();
        let error = false;
        if (inputs.password !== inputs.repassword) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Passwords not matched',
            });
            error = true;
        }

        if (!isValidPassword(inputs.password)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                title: 'Your password should contains:',
                html: `<ul style='color:red'>
                    <li> At least 10 letters or digit</li>
                    <li> Contains at least one special character</li>
                    <li> Has both lower case and upper case letters</li>
                </ul>`
            });
            error = true;
        }

        if (error === false) {
            signupAPI(inputs)
                .then((res) => res.succes
                    ? navigate('/login')
                    : Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: res.error
                    }))
                .catch((e) => console.log(e));
        }
    }

    return (
        <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={handelSubmit}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign Up</h3>
                    <div className="text-center">
                        Already registered?{" "}
                        <span className="link-primary" style={{ cursor: "pointer" }} onClick={() => navigate('/login')}>
                            Sign In
                        </span>
                    </div>
                    <div className="form-group mt-3">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control mt-1"
                            placeholder="Email Address"
                            name="email"
                            onChange={handelOnChange}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Password"
                            name="password"
                            onChange={handelOnChange}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Re-Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Re-Password"
                            name="repassword"
                            onChange={handelOnChange}
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
