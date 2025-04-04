import { Link,useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar = () => {

    const [ isAuth, setIsAuth ] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userIsAuthenticated = localStorage.getItem("isAuth") === "true"; // Vérifier si l'utilisateur est authentifié
            setIsAuth(userIsAuthenticated); //  Mettre à jour l'état
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("isAuth");  // Supprimer le token de connexion
        setIsAuth(false);   // Mettre à jour l'état
        navigate("/login"); // Rediriger vers la page de connexion
    };

    return (
        <nav style={styles.nav}>
            <ul style={styles.navList}>

                <li style={styles.navItem}>
                    <Link to='/' style={styles.navLink}>
                        Accueil
                    </Link>
                </li>

                <li style={styles.navItem}>
                { isAuth ? (        // Si l'utilisateur est authentifié
                    <button style={styles.navLink} onClick={handleLogout}>Logout</button>
                ) : (
                    <Link to="/login" style={styles.navLink}>Se connecter</Link> )}
                </li>



            </ul>
        </nav>
    )
}

const styles = {
    nav: {
        backgroundColor: 'blue',
        padding: '13px',
    },
    navList: {
        listStyleType: 'none',
        display: 'flex',
        justifyContent: 'space-around',
        margin: 0,
        padding: 0
    },
    navItem: {
        margin: '0 10px',
    },
    navLink: {
        color: 'white',
        textDecoration: 'none',
        fontSize: '2em'
    }
}

export default Navbar
