import React, { useState } from 'react';
import AlbumsManager from './AlbumsManager';
import PhotosManager from './PhotosManager';
import SalonsManager from './SalonsManager';

const DashboardAdmin = () => {
  const [tab, setTab] = useState('albums');

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Dashboard Admin</h1>
      <div style={styles.tabContainer}>
        <button onClick={() => setTab('albums')} style={styles.tabBtn}>Albums</button>
        <button onClick={() => setTab('photos')} style={styles.tabBtn}>Photos</button>
        <button onClick={() => setTab('dates')} style={styles.tabBtn}>Salons</button>
      </div>

      <div style={styles.content}>
        {tab === 'albums' && <AlbumsManager />}
        {tab === 'photos' && <PhotosManager />}
        {tab === 'dates' && <SalonsManager />}
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '20px' },
  title: { textAlign: 'center', marginBottom: '20px' },
  tabContainer: { display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' },
  tabBtn: { padding: '10px 20px', cursor: 'pointer', backgroundColor: '#1e90ff', color: '#fff', border: 'none', borderRadius: '5px' },
  content: { maxWidth: '800px', margin: '0 auto' },
};

export default DashboardAdmin;
