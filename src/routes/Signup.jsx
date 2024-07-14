import React from "react";
import Form from "../Components/Form";
import "../Components/Form.css";

function Signup(){
    return (
    <>
    <div className="signup_bg">
        <div className="form_container">
            <div className="form_header">
                <h1>Signup</h1>
                <span>Already have an account?</span>
                <a href="/login">Login</a>
            </div>
            <div className="form_body">
                <Form tag="signup" />
            </div>
        </div>
    </div>
    </>
    );
}

export default Signup;