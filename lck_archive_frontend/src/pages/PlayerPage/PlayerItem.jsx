import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PlayerItem.scss';

function PlayerItem({
  player_name,
  player_nickname,
  player_img,
  player_position,
  team_name,
}) {
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(`http://localhost:3010/image/${player_img}`, {
          responseType: 'blob', // Set response type to blob
        });
        // Create a temporary URL object from the response blob
        const imageURL = URL.createObjectURL(response.data);
        
        setImageURL(imageURL);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImage();

    // Clean up the URL object when component unmounts
    return () => {
      if (imageURL) {
        URL.revokeObjectURL(imageURL);
      }
    };
  }, [player_img]);
  console.log(imageURL);
  return (
    <div className="PlayerItem">
      {imageURL ? (
        <img className="playerImage" src={imageURL} alt={player_name} />
      ) : (
        <div className="placeholderImage">Image Loading...</div>
      )}
      <div className="playerInfo">
        <h2>{player_name}</h2>
        <p>{player_nickname}</p>
        <p>{player_position}</p>
        <p>{team_name}</p>
      </div>
    </div>
  );
}

export default PlayerItem;
