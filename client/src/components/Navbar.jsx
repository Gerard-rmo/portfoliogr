import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Navbar.css'; // import du fichier CSS

const Navbar = () => {
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userIsAuthenticated = JSON.parse(localStorage.getItem("isAuth") || "false");
    setIsAuth(userIsAuthenticated);
  }, []);

  return (
    <nav className="nav" role="navigation">
      <ul className="navList">
        <li className="navItem">
          <Link to="/" className="btnLink">Accueil</Link>
        </li>
        <li className="navItem">
          <Link to="/albums" className="navLink">Bédéthèque</Link>
        </li>
        <li className="navItem">
          <Link to="/skates" className="navLink">Planches de skate</Link>
        </li>
        <li className="navItem">
          <Link to="/salons" className="navLink">Salons</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
