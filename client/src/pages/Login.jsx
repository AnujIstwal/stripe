import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const loginUser = async (e) => {
        e.preventDefault();

        const { email, password } = data;
        try {
            const { data } = await axios.post("/login", {
                email,
                password,
            });

            if (data.error) {
                toast.error(data.error);
            } else {
                setData(data);
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="login">
            <h4>Login to you account</h4>
            <form onSubmit={loginUser}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={data.email}
                        onChange={(e) =>
                            setData({ ...data, email: e.target.value })
                        }
                    />
                </div>

                <div>
                    <label htmlFor="pass">Password</label>
                    <input
                        type="password"
                        name="pass"
                        id="pass"
                        value={data.password}
                        onChange={(e) =>
                            setData({ ...data, password: e.target.value })
                        }
                    />
                </div>

                <div className="remb-me">
                    <input
                        type="checkbox"
                        id="rmb-me"
                        name="rmb-me"
                        value="off"
                    />
                    <label htmlFor="rmb-me"> Remember Me</label>
                </div>

                <button type="submit">Login</button>
            </form>

            <div className="note-text">
                New to MyApp? <a href="/register">Sign Up</a>
            </div>
        </div>
    );
};

export default Login;
