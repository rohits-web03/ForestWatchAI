import React, { useEffect, useState } from 'react';
import TableData from '../Components/TableData';
import "./Poacher.css";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "./forestfire.css";

function ForestFire(){
  const [temperature, setTemperature] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [fireData,setFireData]=useState([]);  
  
  const handleTemperatureChange = (e) => {
    setTemperature(e.target.value);
  };

  const callFireApi = async () => {
    try {
        if (!temperature) {
            window.alert('Please enter the value of temperature');
            return;
          }
        setLoading(true);
      const response = await fetch('https://firewaterapi.onrender.com/firedetector', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({  firesensordata:parseInt(temperature) }), // Send temperature as JSON
      });
      setLoading(false);
      if (!response.ok) {
        throw new Error('Failed to fetch API');
      }

      const data = await response.json();
      setResponseMessage(data); // Display API response message
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('An error occurred.');
    }
  };

  const getFireData=async()=>{
    try{
        const res=await fetch("https://auth-handler-forestwatchai.onrender.com/fireData",{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                'Accept': 'application/json'
            }
        });

        if (!res.ok) {
            throw new Error("Request failed");
        }
        
        const data=await res.json();
        if(data.length > 0){
            setFireData(data);
        }
        console.log(data);
    }catch(err){
        console.log(`The error is:${err}`);
    }
  }
  
  useEffect(()=>{
    getFireData();
  },[responseMessage]);

  

  return (
    <>
      <Navbar />
      <div id="for-1">
        <div id="for-fir-main">
      <h1>Forest Fire Alert</h1>
      <h2>Input data to test the feature:</h2>
        <input type="number" value={temperature} placeholder='Enter temperature' onChange={handleTemperatureChange} />
      <button onClick={callFireApi}>Submit</button>
      {isLoading && (
        <div className="loading-spinner"></div>
      )}
      {responseMessage && !isLoading && (
        <div>
          <h2>API Response:</h2>
          <p>{responseMessage}</p>
        </div>
      )}
      <div>
      <div className="dataTable_heading">
            <h1>Past Temperature Readings:</h1>
      </div>
        <table>
            <thead>
                <tr>
                    <th>Temperature</th>
                    <th>Capture Time</th>
                    <th>Capture Location</th>
                </tr>
            </thead>
            <tbody>
                <TableData value={fireData}/>
            </tbody>
        </table>
      </div>
      </div>
    </div>
      <Footer />
    </>
  );
}

export default ForestFire;
