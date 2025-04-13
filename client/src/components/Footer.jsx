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
        <footer style={styles.footer}>
            <ul style={styles.navList}>
                <li style={styles.navItem}>
                    <Link to="/presse" style={styles.navLink}>Presse</Link>
                </li>
                <li style={styles.navItem}>
                    <Link to="/photos-salons" style={styles.navLink}>Photos des salons</Link>
                </li>
            </ul>

            <div style={styles.socialLinks}>
                <a href="https://www.facebook.com/Gerard Romero" target="_blank" rel="noopener noreferrer" style={styles.iconLink}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="#ffffff" viewBox="0 0 24 24">
                        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.12 8.44 9.88v-6.99H7.9v-2.89h2.54V9.41c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.77l-.44 2.89h-2.33v6.99C18.34 21.12 22 16.99 22 12z"/>
                    </svg>
                </a>

                <a href="https://www.instagram.com/g.rar64240" target="_blank" rel="noopener noreferrer" style={styles.iconLink}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="#ffffff" viewBox="0 0 24 24">
                        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5Zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5Zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5Zm4.38-.63a.88.88 0 1 1 0 1.75.88.88 0 0 1 0-1.75Z" />
                    </svg>
                </a>
            </div>
        </footer>
    );
};

const styles = {
    footer: {
        backgroundColor: 'rgb(28, 91, 143)',
        padding: '13px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    navList: {
        listStyleType: 'none',
        display: 'flex',
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
    socialLinks: {
        display: 'flex',
        gap: '15px',
    },
    iconLink: {
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        transition: 'transform 0.2s',
    },
};

export default Footer;
