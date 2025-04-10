// import React, { useState } from 'react';

// const AlbumForm = ({ initialData = {}, onSubmit, title }) => {
//     const [album, setAlbum] = useState({
//         title: initialData.title || "",
//         imageURL: initialData.imageURL || "",
//         summary: initialData.summary || "",
//     });
//     const [errors, setErrors] = useState({});

//     // Fonction pour valider les données du formulaire
//     const validateForm = () => {
//         const newErrors = {};
//         if (!album.title) newErrors.title = 'Le titre est requis';
//         if (!album.imageURL || !(album.imageURL instanceof File)) {
//             newErrors.imageURL = 'Veuillez sélectionner une image valide';
//         }
//         if (!album.summary) newErrors.summary = 'Le résumé est requis';
//         return newErrors;
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setAlbum((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//     };

//     const handleImageChange = (e) => {
//         setAlbum((prev) => ({
//             ...prev,
//             imageURL: e.target.files[0],
//         }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         const formErrors = validateForm();
//         setErrors(formErrors);

//         if (Object.keys(formErrors).length === 0) {
//             onSubmit(album);
//         }
//     };

//     return (
//         <div style={styles.container}>
//             <h1 style={styles.loginFormH1}>{title || 'ALBUMS DISPONIBLES'}</h1>
//             <div style={styles.loginContainer}>
//                 <form onSubmit={handleSubmit} style={styles.loginForm}>
//                     <div style={styles.inputGroup}>
//                         <label htmlFor="title" style={styles.inputGroupLabel}>Titre</label>
//                         <input
//                             type="text"
//                             name="title"
//                             id="title"
//                             value={album.title}
//                             onChange={handleChange}
//                             required
//                             style={styles.inputGroupInput}
//                         />
//                         {errors.title && <p style={styles.errorText}>{errors.title}</p>}
//                     </div>

//                     <div style={styles.inputGroup}>
//                         <label htmlFor="imageURL" style={styles.inputGroupLabel}>Image</label>
//                         <input
//                             type="file"
//                             name="imageURL"
//                             id="imageURL"
//                             onChange={handleImageChange}
//                             required
//                             accept="image/*"
//                             style={styles.inputGroupInput}
//                         />
//                         {errors.imageURL && <p style={styles.errorText}>{errors.imageURL}</p>}
//                     </div>

//                     <div style={styles.inputGroup}>
//                         <label htmlFor="summary" style={styles.inputGroupLabel}>Résumé</label>
//                         <input
//                             type="text"
//                             name="summary"
//                             id="summary"
//                             value={album.summary}
//                             onChange={handleChange}
//                             required
//                             style={styles.inputGroupInput}
//                         />
//                         {errors.summary && <p style={styles.errorText}>{errors.summary}</p>}
//                     </div>

//                     <button type="submit" style={styles.button}>
//                         Envoyer
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// const styles = {
//     container: {
//         padding: '20px',
//         maxWidth: '1200px',
//         margin: '0 auto',
//         background: "linear-gradient(90deg, rgba(50,43,172,1) 0%, rgba(93,221,30,0.4526143220960259) 57%, rgba(0,212,255,1) 100%)",
//     },
//     loginContainer: {
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         minHeight: "100vh", // Correction ici
//         background: "linear-gradient(90deg, rgba(50,43,172,1) 0%, rgba(93,221,30,0.4526143220960259) 57%, rgba(0,212,255,1) 100%)",
//     },
//     loginForm: {
//         backgroundColor: "#3090c0",
//         padding: "2rem",
//         borderRadius: "8px",
//         boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
//         width: "300px",
//         maxWidth: "100%",
//     },
//     loginFormH1: {
//         textAlign: "center",
//         marginBottom: "1rem",
//         color: "black",
//         textDecoration: "underline",
//     },
//     inputGroup: {
//         marginBottom: "1rem",
//     },
//     inputGroupLabel: {
//         display: "block",
//         marginBottom: "0.5rem",
//         color: "white",
//     },
//     inputGroupInput: {
//         width: "100%",
//         padding: "0.5rem",
//         border: "1px solid #ccc",
//         borderRadius: "4px",
//     },
//     button: {
//         width: "100%",
//         padding: "0.75rem",
//         backgroundColor: "#007BFF",
//         border: "none",
//         borderRadius: "4px",
//         color: "white",
//         fontSize: "1rem",
//         cursor: "pointer",
//         transition: "background-color 0.3s ease",
//     },
//     errorText: {
//         color: 'red',
//         fontSize: '12px',
//         marginTop: '5px',
//     },
// };

// export default AlbumForm;
