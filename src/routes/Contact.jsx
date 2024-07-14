import Navbar from "../Components/Navbar";
import Form from "../Components/Form";
import Footer from "../Components/Footer";
import "../Components/Form.css";

function Contact (){
    return(
        <>
        <div className="contact_bg">
            <Navbar />
            <div className="for_nav">
                <section className="contact">
                    <div className="contact_header">
                        <h1>Contact With Us</h1>
                        <p>We would love to interact with you</p>
                        <p>Feel free to get in touch with us</p>
                    </div>
                <div className="contact_container">
                <div className="contact_info">
                    <h2>Reach Us</h2>
                    <div className="contact_box">
                        <div className="icon"><i class="fa-solid fa-envelope"></i></div>
                        <div className="text">
                            <h3>Email:</h3>
                            <p>forestwatchai@gmail.com</p>
                        </div>
                    </div>
                    <div className="contact_box">
                        <div className="icon"><i class="fa-solid fa-phone"></i></div>
                        <div className="text">
                            <h3>Phone:</h3>
                            <p>+91 7653423789</p>
                        </div>
                    </div>
                    <div className="contact_box">
                        <div className="icon"><i class="fa-solid fa-address-book"></i></div>
                        <div className="text">
                            <h3>Address:</h3>
                            <p>Kolkata</p>
                        </div>
                    </div>
                </div>
                <div className="contact_form form_container">
                    <h1>Send Message</h1>
                    <Form tag="contact" />
                </div>
                </div>
                </section>
            </div>
        </div>
            <Footer/>
        </>
    );
}

export default Contact;
