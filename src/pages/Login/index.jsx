import React, { useState } from "react";
import styles from "../SignUp/SignUp.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setUser } from "../../store/user.slice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
const Login = () => {
    const dispatch = useDispatch();
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
                onSubmit={async (e) => {
                    e.preventDefault();
                    console.log(data);
                    const res = await fetch(
                        "http://localhost:5000/auth/login",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(data),
                        }
                    );
                    if (res.ok) {
                        const d = await res.json();
                        dispatch(setUser(d.token));
                        toast.success("Logged in!");
                    } else {
                        toast.error("Something went wrong!");
                    }
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
        </div>
    );
};

export default Login;