import './HomePage.css';
import logo from '../assets/logo.webp';
import ima from '../assets/pres.webp';
import slide1 from '../assets/T1.jpg';
import slide2 from '../assets/T2.jpg';
import slide3 from '../assets/T3B.jpg';
import slide4 from '../assets/T3M.jpg';
import slide5 from '../assets/AKELARRE.jpg';
import slide6 from '../assets/ALEM.jpg';
import slide7 from '../assets/MOSQUITO.jpg';
import slide8 from '../assets/protecteurs.png';
import slide9 from '../assets/couv - Copie.png';
import slide10 from '../assets/couv.png';
import "./HomePage.css";

const slides = [slide1, slide2, slide3, slide4, slide5, slide6,slide7, slide8, slide9, slide10]; 

const HomePage = () => {
  return (
    <div className="home-container">
      <img src={logo} alt="Logo du glaive production" className="responsive-logo" />

      <p className="home-description">
        BIENVENUE DANS L'UNIVERS DE GERARD ROMERO<br />
        OÙ VOUS POURREZ DÉCOUVRIR TOUT SON TRAVAIL<br />
        ET COMMANDER SES DIFFÉRENTS ALBUMS BD ET AUTRES CRÉATIONS.
      </p>

      <img src={ima} alt="Présentation de l'auteur" className="responsive-logo2" />

      <div className="carousel-frise">
        <div className="carousel-track-frise">
          {[...slides, ...slides].map((img, index) => (
            <div className="carousel-item-frise" key={index}>
              <img src={img} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: '20px 0',
    maxWidth: '100%',
    margin: '0 auto',
    background: "linear-gradient(90deg, rgba(249, 198, 58, 0.94) 30%, rgba(254, 250, 123, 0.91) 67%, rgb(253, 255, 161) 100%)",
  },
  
  createLink: {
    display: 'inline-block',
    marginBottom: '20px',
    padding: '10px 20px',
    backgroundColor: 'blue',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
  },

  logo: {
    width: '280px', 
    maxWidth: '300px', 
    height: 'auto',
    marginBottom: '5px',
    
  },

  p: {
    fontFamily: "'Verdana', serif", 
    fontSize: '20px',            
    fontWeight: 'bold',
    color: 'rgb(4, 58, 102)',
    lineHeight: '1.6',
    margin: '20px auto',
    padding:'10px',
    maxWidth: '800px',
    textShadow: '1px 10px 5px rgb(226, 99, 20)',
  },
  
  
};

export default HomePage;
