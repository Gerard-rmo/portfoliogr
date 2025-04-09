import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar = () => {
    const [isAuth, setIsAuth] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userIsAuthenticated = JSON.parse(localStorage.getItem("isAuth") || "false");
        setIsAuth(userIsAuthenticated);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("isAuth");
        setIsAuth(false);
        navigate("/login");
    };
    

    return (
        <nav style={styles.nav} role="navigation">
            <ul style={styles.navList}>
                <li style={styles.navItem}>
                    <Link to="/" style={styles.btnLink} >
                        Accueil
                    </Link>
                </li>
                <li style={styles.navItem}>
                    <Link to="/" style={styles.navLink}>
                        Bédéthèque
                    </Link>
                </li> 
                <li style={styles.navItem}>
                    <Link to="/" style={styles.navLink}>
                        Planches de skate
                    </Link>
                </li> 
                <li style={styles.navItem}>
                    <Link to="/" style={styles.navLink}>
                        Salons
                    </Link>
                </li> 

                
            </ul>
        </nav>
    );
};

const styles = {
    nav: {
        backgroundColor: 'rgb(19, 98, 163)',
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
        margin: '0 10 px',
        fontFamily: "'Verdana', serif", 
    },
    navLink: {
        color: 'white',
        textDecoration: 'none',
        fontSize: '15px',
    },
    navButton: {
        backgroundColor: 'transparent',
        border: 'none',
        color: 'white',
        fontSize: '2em',
        cursor: 'pointer',
    },
    btnLink: {
        padding:'5px 10px',
        backgroundColor:'rgb(159, 132, 24)',
        color:'yellow',
        borderRadius: '6px',
        textDecoration: 'none',
        fontWeight: 'bold',
      }
      
};

export default Navbar;
