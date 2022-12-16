import React, { useState } from "react";
import styles from "./SignUp.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Login = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    return (
        <div className={styles.container}>
            <form className={styles.formLogin} method="post">
                <h1>Log In</h1>
                <div>
                    <div>
                        <label for="email">Email address{"\n"}</label>

                        <input
                            type="email"
                            name="email"
                            value={data.email}
                            placeholder="Enter your E-mail id"
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <label for="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={data.password}
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
