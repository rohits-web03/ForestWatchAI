import React from "react";
import Form from "../Components/Form";
import "../Components/Form.css"

function Login(){
    return (<>
    <div className="login_bg">
        <div className="form_container">
            <div className="form_header">
                <h1>Login</h1>
                <span>Don't have an account?</span>
                <a href="/signup">Signup</a>
            </div>
        <div className="form_body">
            <Form tag="login" />
            </div>
        </div>
    </div>
        </>
    );
}

export default Login;