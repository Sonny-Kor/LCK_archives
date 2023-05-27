import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './TeamItem.scss';

function TeamItem({ team_name, team_logo }) {
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(`http://localhost:3010/image/team/${team_logo}`, {
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
  }, [team_logo]);

  return (
    <div className="TeamItem">
      <div className="item-row">
        <div className="logo-wrapper">
          <img src={imageURL} className='thumbnail'>
            
          </img>
        </div>
        <div className="itemTitle">{team_name}</div>
      </div>
    </div>
  );
}

export default TeamItem;
