// import { Link } from 'react-router-dom';

// const AlbumCard = ({ album, onDelete }) => {

//     const { title, summary, imageUrl, createdAt, _id } = album;

//     const formattedDate = new Date(createdAt).toLocaleDateString('fr-FR', {
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric',
//     });
//     return (
       
//         <div style={styles.card}>
//             <img src={imageUrl} alt={`Image de l'album ${title}`} style={styles.image} id='zoom' />
//             <div style={styles.content}>
//                 <h2>{title}</h2>
//                 <p>{summary}</p>
//                 <p><b>Publié le :</b>{formattedDate}{" "}</p>

//                 <div style={styles.buttons}>
//                     <button onClick={() => onDelete(_id)} style={styles.deleteButton}>Supprimer</button>
//                     <Link to={`/api/albums/${_id}`} style={styles.detailButton}>Voir les détails {" "}</Link>

//                 </div>
//             </div>

//         </div>
       
//     );
// };

// const styles = {
   
//     card: {
//         display: 'flex',
//         flexWrap:"wrap",
//         border: '1px solid #ccc',
//         borderRadius: '8px',
//         marginBottom: '25px',
//         margin:"20px 10%",
//         padding: '10px',
//         maxWidth: '600px',
//         backgroundColor: '#efe485',
//     },

//     image: {
//         width: '200px',
//         height: '150px',
//         objectFit: 'cover',
//         borderRadius: '8px',
//         marginRight: '15px',

//     },
//     content: {
//         flex: 1,
//     },
//     deleteButton: {
//         backgroundColor: '#e63946',
//         color: '#fff',
//         padding: '5px 10px',
//         border: 'none',
//         borderRadius: '5px',
//         cursor: 'pointer',
//     },
//     detailButton: {
//         display: 'inline-block',
//         marginLeft: '10px',
//         backgroundColor: '#007bff',
//         color: '#fff',
//         padding: '5px 10px',
//         borderRadius: '5px',
//         textDecoration: 'none',
//     },
//     buttons: {
//         marginTop: '10px',
//     }
// };

// export default AlbumCard
