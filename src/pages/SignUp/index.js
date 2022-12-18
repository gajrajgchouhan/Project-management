import React, { useEffect, useState } from "react";
import { validate } from "../../utils/validate";
import styles from "./SignUp.module.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import logo from "../logo.png";

const SignUp = () => {
    const [data, setData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    useEffect(() => {
        setErrors(validate(data, "signUp"));
    }, [data, touched]);

    const changeHandler = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const focusHandler = (event) => {
        setTouched({ ...touched, [event.target.name]: true });
    };

    return (
        <div className={styles.container}>
            <form
                className={styles.formLogin}
                onSubmit={async (e) => {
                    e.preventDefault();
                    console.log(data);
                    const res = await fetch(
                        "http://localhost:5000/auth/register",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                name: data.name,
                                username: data.username,
                                email: data.email,
                                password: data.password,
                            }),
                        }
                    );
                    if (res.ok) {
                        toast.success("Registration successful!");
                    } else {
                        toast.error("Something went wrong!");
                    }
                }}
            >
                <h2>
                    Sign Up{" "}
                    <img
                        src={logo}
                        style={{ height: "50px", width: "auto" }}
                        className="navbar-logo"
                    />
                </h2>

                <div>
                    <div
                        className={
                            errors.name && touched.name
                                ? styles.unCompleted
                                : !errors.name && touched.name
                                ? styles.completed
                                : undefined
                        }
                    >
                        <label htmlFor="name">Name</label>

                        <input
                            type="text"
                            name="name"
                            value={data.name}
                            placeholder="Enter your Name"
                            onChange={changeHandler}
                            onFocus={focusHandler}
                        />
                    </div>
                    {errors.name && touched.name && (
                        <span className={styles.error}>{errors.name}</span>
                    )}
                </div>

                <div>
                    <div
                        className={
                            errors.username && touched.username
                                ? styles.unCompleted
                                : !errors.username && touched.username
                                ? styles.completed
                                : undefined
                        }
                    >
                        <label htmlFor="username">Username</label>

                        <input
                            type="text"
                            name="username"
                            value={data.username}
                            placeholder="Enter username"
                            onChange={changeHandler}
                            onFocus={focusHandler}
                        />
                    </div>
                    {errors.username && touched.username && (
                        <span className={styles.error}>{errors.username}</span>
                    )}
                </div>
                <div>
                    <div
                        className={
                            errors.email && touched.email
                                ? styles.unCompleted
                                : !errors.email && touched.email
                                ? styles.completed
                                : undefined
                        }
                    >
                        <label htmlFor="email">Email</label>

                        <input
                            type="email"
                            name="email"
                            value={data.email}
                            placeholder="Enter your E-mail address"
                            onChange={changeHandler}
                            onFocus={focusHandler}
                        />
                    </div>
                    {errors.email && touched.email && (
                        <span className={styles.error}>{errors.email}</span>
                    )}
                </div>
                <div>
                    <div
                        className={
                            errors.password && touched.password
                                ? styles.unCompleted
                                : !errors.password && touched.password
                                ? styles.completed
                                : undefined
                        }
                    >
                        <label htmlFor="password">Password</label>

                        <input
                            type="password"
                            name="password"
                            value={data.password}
                            placeholder="Password"
                            onChange={changeHandler}
                            onFocus={focusHandler}
                        />
                        {/* <img src={passwordIcon} alt="" /> */}
                    </div>
                    {errors.password && touched.password && (
                        <span className={styles.error}>{errors.password}</span>
                    )}
                </div>
                <div>
                    <div
                        className={
                            errors.confirmPassword && touched.confirmPassword
                                ? styles.unCompleted
                                : !errors.confirmPassword &&
                                  touched.confirmPassword
                                ? styles.completed
                                : !errors.confirmPassword &&
                                  touched.confirmPassword
                                ? styles.completed
                                : undefined
                        }
                    >
                        <label htmlFor="password">Confirm Password</label>

                        <input
                            type="password"
                            name="confirmPassword"
                            value={data.confirmPassword}
                            placeholder="Confirm Password"
                            onChange={changeHandler}
                            onFocus={focusHandler}
                        />
                        {/* <img src={passwordIcon} alt="" /> */}
                    </div>
                    {errors.confirmPassword && touched.confirmPassword && (
                        <span className={styles.error}>
                            {errors.confirmPassword}
                        </span>
                    )}
                </div>

                <div>
                    <center>
                        <button type="submit">Create Account</button>
                    </center>
                    <span
                        style={{
                            color: "black",
                            textAlign: "center",
                            display: "inline-block",
                            width: "100%",
                        }}
                    >
                        Already have a account? <Link to="/Login">Log In</Link>
                    </span>
                </div>
            </form>
        </div>
    );
};

export default SignUp;
