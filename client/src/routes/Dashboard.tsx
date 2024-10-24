import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import axios from "axios";

const Dashboard = () => {
  const isAuthenticated = useAuth();
  const navigate=useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8000/logout', {}, { withCredentials: true });
      
      // Redirect to login or another page
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate('/login'); 
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated === null) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">Loading...</div>; 
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <h1>Dashboard</h1>
      {isAuthenticated && <Button onClick={handleLogout}>Logout</Button>}
    </div>
  )
}

export default Dashboard