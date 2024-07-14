import React,{useState} from "react";
import {useNavigate} from "react-router-dom";
import InputField from "../Components/InputField";
// import "./Form.css";

function Form(props){ 
    const navigate=useNavigate();
    const [dataSignup, setDataSignup] = useState({
        fname: '',
        lname: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    const [dataLogin, setDataLogin]=useState({
        email: '',
        password: ''
    });
    const [dataContact, setDataContact]=useState({
        name: '',
        phone: '',
        email: '',
        subject: '',
        message: ''
    });
    
    //For Signup
    const handleSubmitSignup = (event) => {
        if (validateFormSignup()) {
          // You can handle form submission here, e.g., send form data to the server
          console.log('Form submitted successfully!', dataSignup);
        }
      };
    const validateFormSignup = () => {
      const {password, confirmPassword } = dataSignup;
      if (password !== confirmPassword) {
        alert('Password and Confirm Password must match.');
        return false;
      }
    
      return true;
    };
    
      const handleChangeSignup = (event) => {
        const { name, value } = event.target;
        setDataSignup((prevdataSignup) => ({
          ...prevdataSignup,
          [name]: value,
        }));
      };

      const PostDataSignup=async (e)=>{
        try{
        e.preventDefault();

        const {fname,lname,email,password,confirmPassword}=dataSignup;
        //  "proxy": "http://localhost:8000",
        const res=await fetch("https://auth-handler-forestwatchai.onrender.com/register",{
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            fname,lname,email,password,confirmPassword
            //Usually written as firstName:firstName but since key and value is same
            //we are writing as above
          })
        });
        const datasign=await res.json();
        if(res.status===422 || !datasign || res.status===500){
          window.alert("Invalid Registration");
          console.log("Invalid Registration");
        } else if(res.status===201){
          window.alert("Registration Successful");
          console.log("Registration Successful");
          navigate("/login");
        }
      } catch(err){
        console.error('Error fetching data:', err);
      }
      };
    
      //For Login
      const handleSubmitLogin = (event) => {
        if (validateFormLogin()) {
          // You can handle form submission here, e.g., send form data to the server
          console.log('Form submitted successfully!', dataLogin);
        }
      };
      const validateFormLogin = () => {
        const {password, confirmPassword } = dataLogin;
        if (password !== confirmPassword) {
          alert('Password and Confirm Password must match.');
          return false;
        }
    
        return true;
      };
    
      const handleChangeLogin = (event) => {
        const { name, value } = event.target;
        setDataLogin((prevdataLogin) => ({
          ...prevdataLogin,
          [name]: value,
        }));
      };

      const PostDataLogin=async (e)=>{
        try{
        e.preventDefault();

        const {email,password}=dataLogin;
        const res=await fetch("https://auth-handler-forestwatchai.onrender.com/login",{
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            email,password
          })
        });
        const datalog=await res.json();
        if(res.status===400 || !datalog){
          // console.log(res.status);
          // console.log(data);
          window.alert("Invalid Credentials");
        } else{
          window.alert("Login Successful");
          navigate("/");
        }
      } catch(err){
        console.error('Error fetching data:', err);
      }
      
      };

      //For Contact Page
      const handleSubmitContact = (event) => {
        if (validateFormContact()) {
          // You can handle form submission here, e.g., send form data to the server
          console.log('Form submitted successfully!', dataContact);
        }
      };
      const validateFormContact = () => {
        const {password, confirmPassword } = dataContact;
        if (password !== confirmPassword) {
          alert('Password and Confirm Password must match.');
          return false;
        }
    
        return true;
      };
    
      const handleChangeContact = (event) => {
        const { name, value } = event.target;
        setDataContact((prevdataContact) => ({
          ...prevdataContact,
          [name]: value,
        }));
      };

      const PostDataContact=async (e)=>{
        try{
        e.preventDefault();

        const {name,phone,email,subject,message}=dataContact;
        const res=await fetch("https://auth-handler-forestwatchai.onrender.com/contact",{
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            name,phone,email,subject,message
          })
        });
        const datalog=await res.json();
        if(res.status===400 || !datalog){
          // console.log(res.status);
          // console.log(data);
          window.alert("Invalid Credentials");
        } else{
          window.alert("Login Successful");
          navigate("/");
        }
      } catch(err){
        console.error('Error fetching data:', err);
      }
      
      };

    if(props.tag === "signup"){
        return( 
        <>
            <form method="POST" onSubmit={handleSubmitSignup}>
                <InputField placeHolder="First Name" type="text" name="fname" value={dataSignup.fname} onChange={handleChangeSignup} />
                <InputField placeHolder="Last Name" type="text" name="lname" value={dataSignup.lname} onChange={handleChangeSignup} />
                <InputField placeHolder="Email" type="email" name="email" value={dataSignup.email} onChange={handleChangeSignup} />
                <InputField placeHolder="Password" type="password" name="password" value={dataSignup.password} onChange={handleChangeSignup} />
                <InputField placeHolder="Confirm Password" type="password" name="confirmPassword" value={dataSignup.confirmPassword} onChange={handleChangeSignup} />
                <input className="submit" type="submit" value="Signup" onClick={PostDataSignup}/>
            </form>
        </>
        );
    } else if(props.tag === "login"){
        return( 
            <>
                <form onSubmit={handleSubmitLogin}>
                    <InputField placeHolder="Email" type="email" name="email" value={dataLogin.email} onChange={handleChangeLogin} />
                    <InputField placeHolder="Password" type="password" name="password" value={dataLogin.password} onChange={handleChangeLogin} />
                    <input className="submit" type="submit" value="Login" onClick={PostDataLogin}/>
                </form>
            </>
        );
    } else if(props.tag === "contact"){
        return( 
            <>
                <form onSubmit={handleSubmitContact}>
                    <InputField placeHolder="Name" type="text" name="name" value={dataContact.name} onChange={handleChangeContact} />
                    <InputField placeHolder="Phone" type="tel" name="phone_no" value={dataContact.phone} onChange={handleChangeContact} />
                    <InputField placeHolder="Email" type="email" name="email" value={dataContact.email} onChange={handleChangeContact} />
                    <InputField placeHolder="Subject" type="text" name="subject" value={dataContact.subject} onChange={handleChangeContact} />
                    <InputField placeHolder="Message" type="text" name="message" value={dataContact.message} onChange={handleChangeContact} />
                    <input className="submit" type="submit" value="Send Message" onClick={PostDataContact}/>
                </form>
            </>
        );
    }
}

export default Form;
