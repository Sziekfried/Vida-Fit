import * as Home from './Home'
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

//Esta es la pagina que el publico tiene acceso
function HomePage() {
  return (
    <>
      <div id="carrusel">
      <Home.Carrusel  /> 
      </div>
      <div className='bgs-first' style={{minHeight:"100vh", display:"flex", alignItems:"center"}} id ="about">
      <Home.About />
      </div>
      <div className='bgs-third' style={{display:"flex", alignItems:"center"}} id ="membresias">
      <Home.MembCards />
      </div>
      <div className='bgs-second'style={{display:"flex", alignItems:"center"}} id = "contact">
      <Home.Contact />
      </div>
      <Footer />
    </>
  );
}

export default HomePage;
