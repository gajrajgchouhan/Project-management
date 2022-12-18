import React, { useState } from "react";
import styles from "./login.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setUser } from "../../store/user.slice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import logo from "../logo.png";
const Login = () => {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const loc = useLocation();
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    return (
        <>
            <div className={styles.flexbox_container}>
                <div className={styles.side}>
                <div className={styles.container}>
            <form
                className={styles.formLogin}
                onSubmit={async (e) => {
                    e.preventDefault();
                    const res = await fetch(
                        "http://BASE_URL/auth/login",
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
                        dispatch(setUser(d));
                        toast.success("Logged in!");
                        nav(loc.state?.from || "/projects");
                    } else {
                        toast.error("Something went wrong!");
                    }
                }}
            >
                <h2>
                    Log In <img src={logo} style={{ height: "50px", width: "auto" }} className='navbar-logo' />
                </h2>
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
                </div>
                <div className={styles.main}>
                    <center><h1 className={styles.heading}>DevColab</h1>
                    <img 
                                        src={require(".././Profile/img/landing_page_img.png")}
                                        alt="DevColab"
                                        className="my-5"
                                        style={{ width: "500px" , marginLeft:"10%" }}
                                        fluid
                                    /></center>
                </div>
            </div>
        </>
    );
};

export default Login;
