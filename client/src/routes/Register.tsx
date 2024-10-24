import React, { useState } from 'react';

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegisterForm>({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState<Partial<RegisterForm>>({});

  const validateForm = () => {
    let tempErrors: Partial<RegisterForm> = {};

    if (!formData.name.trim()) {
      tempErrors.name = 'Name is required';
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email';
    }
    if (!formData.password) {
      tempErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Only proceed if the form is valid
    if (validateForm()) {
      try {
        console.log('Register Data:', formData);
  
        const res = await fetch("http://localhost:8000/register", {
          method: "POST", // Set the method to POST
          headers: {
            "Content-Type": "application/json", // Specify the content type as JSON
          },
          body: JSON.stringify(formData), // Send the formData as a JSON string
        });
  
        // Parse the response
        const data = await res.json(); 
  
        // Display the response message in an alert
        if (res.ok) {
          alert(`Success: ${data.message}`);
        } else {
          alert(`Error: ${data.message}`);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Please try again.");
      }
    }
  };  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              className={`w-full p-3 mt-1 rounded-lg bg-gray-700 text-white ${errors.name && 'border-red-500'}`}
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
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
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className={`w-full p-3 mt-1 rounded-lg bg-gray-700 text-white ${errors.confirmPassword && 'border-red-500'}`}
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>
          <button
            type="submit"
            className="w-full p-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;