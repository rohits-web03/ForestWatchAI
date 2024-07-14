import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "./servicestyle.css"
import { useEffect } from "react";

function Service (){
    return(
        <>
{/*             <Navbar /> */}
            <div className="for_nav">
               <Navbar />
                <div id="ser-div">
                    <a href="/poacher detection"><button id="bt-1" className="ser-btn">POACHER DETECTION</button></a>
                    <a href="/forest fire alert"><button id="bt-2" className="ser-btn">FOREST FIRE ALERT</button></a>
                    <a href="/flood alert"><button id="bt-3" className="ser-btn">FLOOD ALERT</button></a>
                </div>
            </div>
            <div id="footer-ser">
                <Footer/>
            </div>
            
        </>
    );
}

export default Service;
