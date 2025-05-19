
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
import slide11 from '../assets/az.png';
import "./HomePage.css";

const slides = [slide1, slide2, slide3, slide4, slide5, slide6,slide7, slide8, slide9, slide10, slide11]; 

const HomePage = () => {
  return (
    <div className="home-container">
     
      <p className="home-description1">
         GERARD ROMERO<br />
        PORTFOLIO
      </p>
      
      <div class="flex-container">

        <img src="src/assets/bulbe.jpg" alt="logo" class="responsive-logo2" />

       <div class="home-description">Bienvenue sur mon portfolio professionnel.<br></br><br></br>

              Je suis développeur web full-stack, spécialisé dans la conception et le développement d’applications web modernes et performantes.<br></br>
              Mon expertise repose sur des technologies telles que JavaScript, React, Node.js et MongoDB, avec une attention particulière portée à l’ergonomie et à la performance.<br></br>

              Rigoureux, autonome et à l’écoute, je m’investis pleinement dans chaque projet pour proposer des solutions efficaces, évolutives et adaptées aux besoins des utilisateurs.
              Je suis également en veille constante afin de rester à jour sur les dernières tendances du développement web et les bonnes pratiques du secteur.<br></br>

              À travers ce portfolio, je vous invite à découvrir mes réalisations, mon parcours ainsi que les compétences que je mets à disposition pour vos projets numériques.<br></br>
              N’hésitez pas à me contacter pour toute collaboration ou opportunité professionnelle.
              </div>

       

      </div>


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

export default HomePage;
