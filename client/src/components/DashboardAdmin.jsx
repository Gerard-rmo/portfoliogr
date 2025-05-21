import React, { useState } from 'react';
import AlbumsManager from './AlbumsManager';
import PhotosSalonsManager from './PhotosSalonsManager';
import PhotosSkatesManager from './PhotosSkatesManager';
import PhotosPresseManager from './PhotosPresseManager';
import SalonsManager from './SalonsManager';
import { useNavigate } from 'react-router-dom';
import './DashboardAdmin.css';

const DashboardAdmin = () => {
  const [tab, setTab] = useState('albums');
  const navigate = useNavigate();

  const renderTab = () => {
    switch (tab) {
      case 'albums':
        return <AlbumsManager />;
      case 'dates':
        return <SalonsManager />;
      case 'photosSalons':
        return <PhotosSalonsManager />;
      case 'photosSkates':
        return <PhotosSkatesManager />;
      case 'photosPresse':
        return <PhotosPresseManager />;
      default:
        return null;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <div className="dashboard-container">
      <button onClick={handleLogout} className="deco-btn">DECONNEXION</button>
      <h1 className="dashboard-title">TABLEAU DE BORD ADMINISTRATEUR</h1>

      <div className="tab-container">
        <button onClick={() => setTab('albums')} className="tab-btn">Albums</button>
        <button onClick={() => setTab('dates')} className="tab-btn">Salons</button>
        <button onClick={() => setTab('photosSalons')} className="tab-btn">Photos Salons</button>
        <button onClick={() => setTab('photosSkates')} className="tab-btn">CV</button>
        <button onClick={() => setTab('photosPresse')} className="tab-btn">Photos Presse</button>
      </div>

      <div className="dashboard-content">
        {renderTab()}
      </div>
    </div>
  );
};

export default DashboardAdmin;



