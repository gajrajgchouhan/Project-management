import React from "react";

const Footer = () => {
    return (
        <div
            style={{
                paddingTop: "8px",
                bottom: 0,
                width: "100%",
                /* Height of the footer*/
                height: "12%",
                backgroundColor: "rgb(45, 52, 70)",
            }}
        >
            <p
                style={{
                    color: "white",
                    textAlign: "center",
                    // marginTop: "-3px"
                }}
            >
                <h5>
                    <a
                        href="/"
                        style={{
                            color: "rgb(201, 212, 243)",
                        }}
                    >
                        DevColab
                    </a>{" "}
                    , 2022
                </h5>
                <h6>&copy; All rights reserved</h6>
            </p>
        </div>
    );
};

export default Footer;
