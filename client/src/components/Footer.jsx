import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Footer = () => {
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
                    <Link to="/" style={styles.navLink}>
                        Presse
                    </Link>
                </li>
                <li style={styles.navItem}>
                    <Link to="/" style={styles.navLink}>
                        Photos des salons
                    </Link>
                </li> 
                <li style={styles.navItem}>
                    <Link to="/" style={styles.navLink}>
                       rp Facebook
                    </Link>
                </li> 
                <li style={styles.navItem}>
                    <Link to="/" style={styles.navLink}>
                        rp Insta
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
};

export default Footer;
