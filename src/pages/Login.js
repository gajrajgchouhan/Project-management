import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import styles from "./SignUp.module.css";
import { ToastContainer } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Login = () => {
    const nav = useNavigate();
    const loc = useLocation();
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    return (
        <div className={styles.container}>
            <form
                className={styles.formLogin}
                onSubmit={(e) => {
                    e.preventDefault();
                    console.log(data);
                }}
            >
                <h1>Log In</h1>
                <br></br>
                <div>
                    <div>
                        <label htmlFor="email">Email address{"\n"}</label>
                        <input
                            value={data.email}
                            onChange={(event) =>
                                setData((v) => ({
                                    ...v,
                                    email: event.target.value,
                                }))
                            }
                            type="email"
                            name="email"
                            placeholder="Enter your E-mail id"
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            value={data.password}
                            onChange={(event) =>
                                setData((v) => ({
                                    ...v,
                                    password: event.target.value,
                                }))
                            }
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                        />
                    </div>
                </div>

                <div>
                    <center>
                        <button type="submit">Login</button>
                    </center>
                    <span
                        style={{
                            color: "black",
                            textAlign: "center",
                            display: "inline-block",
                            width: "100%",
                        }}
                    >
                        Don't have a account?{" "}
                        <Link to="/signUp">Create an account</Link>
                    </span>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Login;
