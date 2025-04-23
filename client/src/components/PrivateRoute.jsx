import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Install with: npm install jwt-decode

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  
  // Check if token exists and isn't expired
  const isAuthenticated = () => {
    if (!token) return false;
    
    try {
      const decoded = jwtDecode(token);
      return decoded.exp * 1000 > Date.now(); // Check expiration
    } catch {
      return false;
    }
  };

  return isAuthenticated() ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;