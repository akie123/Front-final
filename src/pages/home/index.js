import Navbar from './navbar'
import Working from './working'
import Testimonial from './testimonial'
import ContactUs from './contact_us'
import Footer from './footer.js'
import "./home.css";
function Index () {
  
    return (
      <div style={{overflowX : "hidden"}}>
        <Navbar />
        <Working/>
        <Testimonial />
        <ContactUs/>
        <Footer/>
      </div>
    );
}

export default Index