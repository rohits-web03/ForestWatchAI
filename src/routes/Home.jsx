import React from "react";
import Navbar from "../Components/Navbar";
import "./Home.css";
import Footer from "../Components/Footer";
import WeatherTable from "../Components/WeatherTable"

function Home() {
  return (
    <> 
      <Navbar />
      <div id="main">

        {/* page number 1 */}

        <section  className="page hero">
          <div id="heading">
            <h1>Eyes in the Woods:AI on Duty</h1>
          <p>Empowering conservation through AI and image analysis. Hunter detection, alerts for authorities, plus fire and flood prevention via data-driven monitoring</p>
            <div className="btn-box">
              <a href="/login" className="btn">
                Login
              </a>
              <a href="/signup" className="btn">
                Register
              </a>
            </div>
          </div>
        </section>

        {/* page number 2 */}

        <section id="page-2" className="page ">

            <div>
                <h1>NEWS</h1>
                
            </div>

        </section>

        {/* page number 3 */}



        <section id="page-3" className="page">
  <div id="page3-con">
    <div id="map-weather-section">  
      <div id="map-box" className="hover-div">
        
        <a href="https://goo.gl/maps/r5npWdVNZZGasXUg8" target="_blank">
          <img id="map-img" src="https://thewire.in/wp-content/uploads/2016/09/Sunderbans-map-with-Sela-river.png" alt="Map Image" />
          <span class="hover-text">Map of Sundarban</span>
        </a>
      </div>

      <div id="weather-box">
        <div id="weather-box">
          <WeatherTable />
        </div>
      </div>
    </div> 
  </div> 
</section>
        
      </div>
      <Footer/>
    </>
  );
}

export default Home;


// import React from "react";
// import Navbar from "../Components/Navbar";
// import "./Home.css";
// import Footer from "../Components/Footer";
// function Home() {
//   return (
//     <>
//       <Navbar />
//       {/* <video autoPlay muted loop src="src\routes\ForestVideo.mp4"></video> */}

//       <div id="main">

//         {/* page number 1 */}
//         <section id="page-1"  className="page">

//           <h1>ForestWatchAI</h1>
//           <h2>Welcome to our website!</h2>
//           <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, iste!</p>
//           <div id="home-btn">
//             <a href="/signup" className="btn1">Sign up</a>
//             <a href="/login" className="btn1">Login</a>
//           </div>

//         </section>

//         {/* page number 2 */}

//         <section id="page-2" className="page ">

//             {/* <ImageSlider/> */}

//         </section>

//         {/* page number 3 */}

//         <section id="page-3"  className="page">
//           <h1>Statistics</h1>
//         </section>

//         {/* page number 4 */}

//         <section id="page-4" className="page">
//           <div id="page4-con">
//             <h1>Section 4</h1>
//             <div id="map-weather-section">
//                 <div id="map-box">
//                     <h3>Map</h3>
//                 </div>


//             </div>
//           </div>
//         </section>

//       </div>
//       <Footer/>
//     </>
//   );
// }

// export default Home;

