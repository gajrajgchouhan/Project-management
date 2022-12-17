import React from 'react'

const Footer = () => {
    return (
        <div style={{
            position: "fixed",
            padding: "10px 10px 0px 10px",
            bottom: 0,
            width: "100%",
            /* Height of the footer*/
            height: "20px",
            background: "grey"
        }}>
                <h5 style={{
                    color: "black",
                    textAlign: "center",
                    marginTop: "-3px"
                }}>
                    &copy; <a href='/' style={{
                    color: "#152238",}}>
                    DevColab
					</a> , 2022. All rights reserved.
                </h5>
        </div>
    )
}

export default Footer
