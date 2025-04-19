import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userIsAuthenticated = JSON.parse(localStorage.getItem("isAuth") || "false");
    setIsAuth(userIsAuthenticated);
  }, []);

  return (
    <nav style={styles.nav} role="navigation">
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <Link to="/" style={styles.btnLink}>Accueil</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/albums" style={styles.navLink}>Bédéthèque</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/skates" style={styles.navLink}>Planches de skate</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/salons" style={styles.navLink}>Salons</Link>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: 'rgb(28, 91, 143)',
    padding: '13px',
  },
  navList: {
    listStyleType: 'none',
    display: 'flex',
    justifyContent: 'space-around',
    margin: 0,
    padding: 0,
  },
  navItem: {
    margin: '0 10px',
    fontFamily: "'Verdana', serif",
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '15px',
  },
  btnLink: {
    padding: '5px 10px',
    backgroundColor: 'rgb(4, 2, 105)',
    color: 'yellow',
    borderRadius: '50px',
    textDecoration: 'none',
    fontWeight: 'bold',
    boxShadow: '0px 0px 20px rgba(21, 13, 63, 0.93)',
  },
  
  
};

export default Navbar;
