import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const registerUser = async (e) => {
        e.preventDefault();
        const { name, email, password } = data;
        try {
            const { data } = await axios.post("/register", {
                name,
                email,
                password,
            });
            if (data.error) {
                toast.error(data.error);
            } else {
                setData({});
                toast.success("Successfully registered");
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="register">
                <h4>Create Account</h4>
                <form onSubmit={registerUser}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <br />
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={data.name}
                            onChange={(e) =>
                                setData({ ...data, name: e.target.value })
                            }
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <br />
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
                        {" "}
                        <label htmlFor="pass">Password</label>
                        <br />
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

                    <button type="submit">Sign Up</button>
                </form>
                <div className="note-text">
                    Already have an account? <a href="/login">Login</a>
                </div>
            </div>
        </>
    );
};

export default Register;
