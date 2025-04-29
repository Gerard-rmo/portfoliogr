import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';

const LoginPage = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://leglaiveproduction.onrender.com/api/user/login', { email, password });
      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        console.log('REDIRECTING NOW WITH TOKEN:', res.data.token);
        navigate('/admin'); 
      } else {
        setError("Login failed: Invalid response");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Identifiants invalides");
    }
  };

  return (
    <div className="login-page">
      <div className="login-form-container">
        <h2>Connexion Admin</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="input-field"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            className="input-field"
          />
          <button type="submit" className="submit-button">
            Se connecter
          </button>
        </form>
      </div>
      <footer className="login-footer">
        &copy; {new Date().getFullYear()} Mon Application
      </footer>
    </div>
  );
};

export default LoginPage;

