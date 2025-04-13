import React, { useState } from 'react';
import AlbumsManager from './AlbumsManager';
import PhotosSalonsManager from './PhotosSalonsManager';
import PhotosSkatesManager from './PhotosSkatesManager';
import PhotosPresseManager from './PhotosPresseManager';
import SalonsManager from './SalonsManager';

const DashboardAdmin = () => {
  const [tab, setTab] = useState('albums');

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

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Dashboard Admin</h1>

      <div style={styles.tabContainer}>
        <button onClick={() => setTab('albums')} style={styles.tabBtn}>Albums</button>
        <button onClick={() => setTab('dates')} style={styles.tabBtn}>Salons</button>
        <button onClick={() => setTab('photosSalons')} style={styles.tabBtn}>Photos Salons</button>
        <button onClick={() => setTab('photosSkates')} style={styles.tabBtn}>Photos Skates</button>
        <button onClick={() => setTab('photosPresse')} style={styles.tabBtn}>Photos Presse</button>
      </div>

      <div style={styles.content}>
        {renderTab()}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    background: 'linear-gradient(90deg, rgba(249,198,58,0.94) 30%, rgba(254,250,123,0.91) 67%, rgb(253,255,161) 100%)',
    minHeight: '100vh'
  },
  title: {
    textAlign: 'center',
    fontSize: '2rem',
    marginBottom: '30px'
  },
  tabContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '30px'
  },
  tabBtn: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#1e90ff',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    boxShadow: '2px 2px 5px rgba(0,0,0,0.2)',
    transition: 'background-color 0.3s ease',
  },
  content: {
    maxWidth: '1000px',
    margin: '0 auto',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)'
  }
};

export default DashboardAdmin;


