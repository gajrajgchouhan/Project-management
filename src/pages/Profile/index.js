import React, { useRef } from "react";
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBTypography,
    MDBIcon,
} from "mdb-react-ui-kit";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";
import { padding } from "@mui/system";
import { useState, useEffect} from "react";
import { useSelector } from "react-redux";

export default function PersonalProfile() {
    
    // const [channel, setChannel] = useState(null);
    const userState = useSelector((state) => state.user);
    const user = useRef(null);

    useEffect(() => {
        async function init() {

            const res = await fetch("http://localhost:5000/auth/getProfile", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${userState.user}`,
                },
            });
            const d = await res.json();
            user.current = d;
            
        }

        init();

        
    }, []);

    return (
        <section className="vh-100" style={{ backgroundColor: "rgb(234, 241, 255)", padding: "10% 0%" }}>
            <MDBContainer className="py-5 h-100">
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol lg="6" className="mb-4 mb-lg-0">
                        <MDBCard
                            className="mb-3"
                            style={{ borderRadius: ".5rem" }}
                        >
                            <MDBRow className="g-0">
                                <MDBCol
                                    md="4"
                                    className="gradient-custom text-center text-white"
                                    style={{
                                        borderTopLeftRadius: ".5rem",
                                        borderBottomLeftRadius: ".5rem",
                                    }}
                                >
                                    <MDBCardImage
                                        src={require("./img/default_profile.jpg")}
                                        alt="Avatar"
                                        className="my-5"
                                        style={{ width: "80px" }}
                                        fluid
                                    />
                                    <MDBTypography tag="h5">
                                    {user.current.name}
                                    </MDBTypography>
                                    <MDBCardText>Developer</MDBCardText>
                                    <MDBIcon far icon="edit mb-5" />
                                </MDBCol>
                                <MDBCol md="8">
                                    <MDBCardBody className="p-4">
                                        <MDBTypography tag="h6">
                                            Information
                                        </MDBTypography>
                                        <hr className="mt-0 mb-4" />
                                        <MDBRow className="pt-1">
                                            
                                            <MDBCol size="6" className="mb-3">
                                                <MDBTypography tag="h6">
                                                    Username
                                                </MDBTypography>
                                                <MDBCardText className="text-muted">
                                                    {user.current.id}
                                                </MDBCardText>
                                            </MDBCol>
                                        </MDBRow>

                                        
                                        <MDBRow className="pt-1">
                                        <MDBCol size="6" className="mb-3">
                                                <MDBTypography tag="h6">
                                                    Email
                                                </MDBTypography>
                                                <MDBCardText className="text-muted">
                                                {user.current.email}

                                                </MDBCardText>
                                            </MDBCol>
                                        </MDBRow>

                                        <div className="d-flex justify-content-start">
                                            <a href="#!">
                                                <MDBIcon
                                                    fab
                                                    icon="facebook me-3"
                                                    size="lg"
                                                />
                                            </a>
                                            <a href="#!">
                                                <MDBIcon
                                                    fab
                                                    icon="twitter me-3"
                                                    size="lg"
                                                />
                                            </a>
                                            <a href="#!">
                                                <MDBIcon
                                                    fab
                                                    icon="instagram me-3"
                                                    size="lg"
                                                />
                                            </a>
                                        </div>
                                    </MDBCardBody>
                                </MDBCol>
                            </MDBRow>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
}
