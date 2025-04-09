import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CreateAlbum from './pages/CreateAlbum';
import HomePage from './pages/HomePage';
import EditPage from './pages/EditPage';
import AlbumDetailPage from './components/AlbumDetailPage';
import './App.css';

const App = () => {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/album' element={<CreateAlbum />} />
        <Route path='/edit/:id' element={<EditPage />} />
        <Route path='/skill/:id' element={<AlbumDetailPage />} />
      </Routes>

      <div className="contact-wrapper">
        <a href="mailto:gerard.romero.glaive@gmail.com" className="floating-contact">
          Contactez-moi
        </a>
      </div>

      <Footer />
    </Router>
  );
};

export default App;
