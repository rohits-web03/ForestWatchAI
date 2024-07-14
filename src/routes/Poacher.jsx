import React, { useState, useEffect } from "react";
import "./Poacher.css";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
function Poacher() {
  const [imagePreview, setImagePreview] = useState(null);
  const [base64Url, setBase64Url] = useState(null);
  const [resData, setresData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [poacherData,setPoacherData]=useState([]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        console.log(reader.result);
        setImagePreview(reader.result);
        setBase64Url(reader.result.split(",")[1]);
      };
      reader.readAsDataURL(file);
    }
  };

  const imageSubmit = async () => {
    try {
      if (!base64Url) {
        console.log('No image selected.');
        return;
      }
      
      setLoading(true);
      const res = await fetch('https://forestwatchai.onrender.com/mldetector', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imagedata: base64Url }),
      });

      setLoading(false);
      
      if (!res.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await res.json();
      if (!data) {
        throw new Error(res.error);
      } else {
        setresData(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const getPoacherData=async()=>{
    try{
        const res=await fetch("https://auth-handler-forestwatchai.onrender.com/poacherData",{
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
            setPoacherData(data);
        }
        console.log(data);
    }catch(err){
        console.log(`The error is:${err}`);
    }
  }
  
  useEffect(()=>{
    getPoacherData();
  },[resData]);



  return (
    <>
      <Navbar/>
      <div id="poacher-1">
        <div className="poacher-main">
         
          <h1 style={{ fontSize: 50 }}>Poacher Detection</h1>
          <h2>Input an image to test the feature:</h2>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {imagePreview && (
            <div>
              <h2 style={{ fontSize: 30 }}>Preview:</h2>
              <img style={{ width: 400, height: 400 }} src={imagePreview} alt="Uploaded" />
              <button onClick={imageSubmit}>Submit Image</button>
            </div>
          )}
          {isLoading && (
            <div className="loading-spinner"></div>
          )}
          {base64Url && !isLoading && (
            <div>
              <h2>API Response:</h2>
              <p>The given photo is {resData}</p>
              
            </div> 
          )}
          <div>
          <div className="dataTable_heading">
            <h1>Past Poacher Sightings:</h1>
          </div>
          <table>
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Capture Time</th>
                    <th>Capture Location</th>
                </tr>
            </thead>
            <tbody>
                  {
                    poacherData.map((tableData)=>{
                      const {_id,imagedata,capturetime,capturelocation}=tableData;
                      const imageURL="data:image/jpeg;base64," + imagedata;
                      return (
                        <tr key={_id}>
                          <td ><img style={{width:300,height:200}} src={imageURL} alt="Human Image" /></td>
                          <td >{capturetime}</td>
                          <td >{capturelocation}</td>
                        </tr>
                      )
                    })
                  }
            </tbody>
          </table>
        </div>
        </div>
        </div>
       <Footer/>
      </>
  );
}

export default Poacher;
