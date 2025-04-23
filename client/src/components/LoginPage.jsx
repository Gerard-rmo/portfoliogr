import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const LoginPage = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3007/api/user/login', { email, password });
      
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
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Connexion Admin</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          style={{ padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe"
          style={{ padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button 
          type="submit"
          style={{ 
            padding: '10px', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
