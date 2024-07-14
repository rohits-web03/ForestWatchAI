import React, { useState, useEffect } from 'react';
import "./Poacher.css";
import TableData from '../Components/TableData';
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "./flood.css";

function Flood(){
  const [waterLevel, setWaterLevel] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [floodData,setFloodData]=useState([]);

  const handlelevelChange = (e) => {
    setWaterLevel(e.target.value);
  };

  const callFloodApi = async () => {
    try {
        if (!waterLevel) {
            window.alert('Please enter the water level');
            return;
          }
        setLoading(true);
      const response = await fetch('https://firewaterapi.onrender.com/flooddetector', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({  floodsensordata:parseInt(waterLevel) }), // Send temperature as JSON
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

  const getFloodData=async()=>{
    try{
        const res=await fetch("https://auth-handler-forestwatchai.onrender.com/floodData",{
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
            setFloodData(data);
        }
        console.log(data);
    }catch(err){
        console.log(`The error is:${err}`);
    }
  }
  useEffect(()=>{
    getFloodData();
  },[responseMessage]);

  return (
    <>
      <Navbar/>
      <div id="flood-1">
            <div id="flood-main">
      <h1>FLood Alert</h1>
      <h2>Input data to test the feature:</h2>
        <input type="number" value={waterLevel} placeholder='Enter water level' onChange={handlelevelChange} />
      <button onClick={callFloodApi}>Submit</button>
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
            <h1>Past Water Level Data:</h1>
      </div>
        <table>
            <thead>
                <tr>
                    <th>Water Level</th>
                    <th>Capture Time</th>
                    <th>Capture Location</th>
                </tr>
            </thead>
            <tbody>
                <TableData value={floodData}/>
            </tbody>
        </table>
      </div>
      </div>
        </div>
        <Footer/>
    </>
  );
}

export default Flood;


// import React, { useState, useEffect } from 'react';
// import "./Poacher.css";
// import TableData from '../Components/TableData';
// import Navbar from "../Components/Navbar";
// import Footer from "../Components/Footer";
// import "./flood.css";

// function Flood() {
//   const [waterLevel, setWaterLevel] = useState('');
//   const [responseMessage, setResponseMessage] = useState('');
//   const [isLoading, setLoading] = useState(false);
//   const [floodData, setFloodData] = useState([]);

//   const handleLevelChange = (e) => {
//     setWaterLevel(e.target.value);
//   };

//   const callFloodApi = async () => {
//     try {
//       if (!waterLevel) {
//         window.alert('Please enter the water level');
//         return;
//       }
//       setLoading(true);
//       const response = await fetch('https://firewaterapi.onrender.com/flooddetector', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ floodsensordata: parseInt(waterLevel) }), // Send water level as JSON
//       });
//       setLoading(false);

//       if (!response.ok) {
//         throw new Error('Failed to fetch API');
//       }

//       const data = await response.json();
//       setResponseMessage(data.message); // Display API response message
//     } catch (error) {
//       console.error('Error:', error);
//       setResponseMessage('An error occurred.');
//     }
//   };

//   const getFloodData = async () => {
//     try {
//       const res = await fetch("https://auth-handler-forestwatchai.onrender.com/floodData", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           'Accept': 'application/json'
//         }
//       });

//       if (!res.ok) {
//         throw new Error("Request failed");
//       }

//       const data = await res.json();
//       setFloodData(data);
//     } catch (err) {
//       console.log(`The error is:${err}`);
//     }
//   }

//   useEffect(() => {
//     getFloodData();
//   }, []);

//   return (
//     <>
//       <Navbar />
//       <div id="flood-1">
//         <div id="flood-main">
//           <h1>Flood Alert</h1>
//           <h2>Input data to test the feature:</h2>
//           <input type="number" value={waterLevel} placeholder='Enter water level' onChange={handleLevelChange} />
//           <button onClick={callFloodApi}>Submit</button>
//           {isLoading && (
//             <div className="loading-spinner"></div>
//           )}
//           {responseMessage && !isLoading && (
//             <div>
//               <h2>API Response:</h2>
//               <p>{responseMessage}</p>
//             </div>
//           )}
//           {/* Display the entered water level */}
//           {waterLevel && (
//             <div>
//               <h2>Entered Water Level:</h2>
//               <p>{waterLevel}</p>
//             </div>
//           )}
//           <div>
//             <div className="dataTable_heading">
//               <h1>Past Water Level Data:</h1>
//             </div>
//             <table>
//               <thead>
//                 <tr>
//                   <th>Water Level</th>
//                   <th>Capture Time</th>
//                   <th>Capture Location</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <TableData value={floodData} />
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default Flood;






//   );
// }

// export default Flood;
