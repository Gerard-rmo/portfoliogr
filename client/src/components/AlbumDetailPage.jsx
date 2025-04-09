import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAlbum } from "../Services/AlbumsService";

const AlbumDetailPage = () => {

    const { id } = useParams();
    const [album, setAlbum] = useState(null);

    useEffect(() => {
        const fetchAlbumDetails = async () => {
            try {
                const data = await getAlbum(id);
                setAlbum(data);

            } catch (error) {
                console.error(`Erreur lors de la récupération de l'album.`, error);


            }
        };
        fetchAlbumDetails();
    }, [id]);

    if (!album) {
        return <div>Chargement...</div>
    }

    const { title,summary, imageUrl, createdAt } = album;

    const formattedDate = new Date(createdAt).toLocaleDateString('fr-FR',
        {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });


    return (
        <div style={styles.container}>
            <h2>{title}</h2>
            <img src={imageUrl} alt={`Image de l'album ${title}`} style={styles.image} />
            <p>{summary}</p>
            <p><b>Publié le :</b>{formattedDate}</p>
        </div>
    )
}


const styles = {
    container: {
        
        padding: '20px',
        maxWidth: '800px',
        margin: '0 auto',
    },
    image: {
        width: '100%',
        height: 'auto',
        borderRadius: '8px',
        marginBottom: '20px',
    },
};

export default AlbumDetailPage
