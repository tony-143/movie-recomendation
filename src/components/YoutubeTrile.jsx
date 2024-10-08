import React, { useState, useEffect } from 'react';

const YouTubeTrailer = ({ movieTitle }) => {
  const [trailerId, setTrailerId] = useState('');

  useEffect(() => {
    const fetchTrailer = async () => {
      const apiKey = 'AIzaSyC2pue28k1rUg8VFxva41kwuues8IsLnh8';
      const searchQuery = `${movieTitle} trailer`;
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchQuery)}&type=video&key=${apiKey}`;

      try {
        const response = await fetch(url);
        if(!response.ok){
            const errorMessage = await response.json()
            console.log(errorMessage)
        }
        response.json().then(data=>{
            if (data.items.length > 0) {
                const videoId = data.items[0].id.videoId;
                setTrailerId(videoId);
              }
        })

      } catch (error) {
        console.error('Error fetching trailer:', error);
      }
    };

    fetchTrailer();
  }, [movieTitle]);

  return (
    <div>
      {trailerId ? (
        <iframe
          style={{width: '',height: '350px'}}
          className='col-lg-8 col-xl-6 col-xxl-4 col-md-10 col-12'
          src={`https://www.youtube.com/embed/${trailerId}`}
          title={`${movieTitle} Trailer`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <p>Trailer not found.</p>
      )}
    </div>
  );
};

export default YouTubeTrailer;
