import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../services/authApi";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        email: "",

        password: ""

    });

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const data = await loginUser(formData);

            localStorage.setItem("token", data.token);

            localStorage.setItem(
                "employee",
                JSON.stringify(data.employee)
            );

            alert("Login Successful");

            navigate("/");

        } catch (error) {

            alert(

                error.response?.data?.message ||

                "Invalid Login"

            );

        }

    };

    return (

        <div
            className="container d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
        >

            <div className="card shadow p-4" style={{ width: "420px" }}>

                <h2 className="text-center mb-4">

                    HRMS Login

                </h2>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">

                        <label>Email</label>

                        <input

                            type="email"

                            className="form-control"

                            name="email"

                            value={formData.email}

                            onChange={handleChange}

                            required

                        />

                    </div>

                    <div className="mb-3">

                        <label>Password</label>

                        <input

                            type="password"

                            className="form-control"

                            name="password"

                            value={formData.password}

                            onChange={handleChange}

                            required

                        />

                    </div>

                    <button

                        className="btn btn-primary w-100"

                    >

                        Login

                    </button>

                </form>

            </div>

        </div>

    );

}

export default Login;