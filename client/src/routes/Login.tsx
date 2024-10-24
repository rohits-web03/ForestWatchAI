import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from "@/hooks/useAuth";

interface LoginForm {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginForm>({ email: '', password: '' });
  const [errors, setErrors] = useState<Partial<LoginForm>>({});
  const isAuthenticated = useAuth();
  const navigate=useNavigate();

  const validateForm = () => {
    let tempErrors: Partial<LoginForm> = {};

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email';
    }
    if (!formData.password) {
      tempErrors.password = 'Password is required';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        console.log('Login Data:', formData);

        // Make the POST request for login
        const res = await axios.post("http://localhost:8000/login", formData, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Ensure the cookies are sent with requests
        });

        if (res.status === 200) {
          alert("Login successful!");
          navigate("/dashboard");
        } else {
          alert(`Login failed: ${res.data.message}`);
        }
      } catch (error: any) {
        console.error("Error:", error);
        
        if (error.message) {
          alert(`Error: ${error.message}`);
        } else {
          alert("Something went wrong. Please try again.");
        }
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isAuthenticated === true) {
      navigate('/dashboard'); 
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated === null) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">Loading...</div>;  
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className={`w-full p-3 mt-1 rounded-lg bg-gray-700 text-white ${errors.email && 'border-red-500'}`}
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className={`w-full p-3 mt-1 rounded-lg bg-gray-700 text-white ${errors.password && 'border-red-500'}`}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          <button
            type="submit"
            className="w-full p-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
