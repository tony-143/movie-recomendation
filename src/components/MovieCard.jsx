import React from 'react';
import { useNavigate } from 'react-router-dom';

function MovieCard({ title, imageUrl }) {
    const navigate = useNavigate()

    const handleChangeCard = (title) => {
        navigate(`/${title}`)
    }

    return (
        <div onClick={() =>{handleChangeCard(title)}} className="card mb-4" style={{ width: '100%',cursor:'pointer', height: 'auto', maxWidth: '15rem' }}>
            <img src={imageUrl} className="card-img-top img-fluid" style={{ height: '20rem', maxHeight: '21rem', objectFit: 'cover' }} alt={title} />
            <div className="card-body bg-dark" >
                <h5 className="card-title text-truncate" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {title}
                </h5>
            </div>
        </div>
    );
}

export default MovieCard;
