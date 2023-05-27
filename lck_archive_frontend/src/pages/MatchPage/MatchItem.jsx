import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './MatchItem.scss';

function MatchItem({match_data, team1_name, team1_logo, team1_score, team2_name, team2_logo, team2_score, youtube_link }) {
  const [team1ImageURL, setTeam1ImageURL] = useState(null);
  const [team2ImageURL, setTeam2ImageURL] = useState(null);

  useEffect(() => {
    const fetchTeam1Image = async () => {
      try {
        const response = await axios.get(`http://localhost:3010/image/team/${team1_logo}`, {
          responseType: 'blob', // Set response type to blob
        });
        // Create a temporary URL object from the response blob
        const imageURL = URL.createObjectURL(response.data);
        
        setTeam1ImageURL(imageURL);
      } catch (error) {
        console.error('Error fetching team1 image:', error);
      }
    };
    const fetchTeam2Image = async () => {
      try {
        const response = await axios.get(`http://localhost:3010/image/team/${team2_logo}`, {
          responseType: 'blob', // Set response type to blob
        });
        // Create a temporary URL object from the response blob
        const imageURL = URL.createObjectURL(response.data);
        
        setTeam2ImageURL(imageURL);
      } catch (error) {
        console.error('Error fetching team2 image:', error);
      }
    };
    
    fetchTeam1Image();
    fetchTeam2Image();
    
    console.log(team1ImageURL);
    console.log(team2ImageURL)
    // Clean up the URL objects when component unmounts
    return () => {
      if (team1ImageURL) {
        URL.revokeObjectURL(team1ImageURL);
      }
      if (team2ImageURL) {
        URL.revokeObjectURL(team2ImageURL);
      }
    };
  }, [team1_logo, team2_logo]);

  const formattedDate = match_data ? match_data.substring(0, 10) : '';

  return (
    <div className="MatchItem">
      <a href={youtube_link} target='_blank' rel="noopenernoreferrer" className="item-row">
        
        <div className="logo-wrapper">
          <img src={team1ImageURL} className='thumbnail' alt={team1_name} />
        </div>
        <div className="score">{team1_score}</div>
        <div className="vs">vs</div>
        <div className="score">{team2_score}</div>
        <div className="logo-wrapper">
          <img src={team2ImageURL} className='thumbnail' alt={team2_name} />
        </div>
        
        <div className='Date'>
          {formattedDate}
        </div>
      </a>
    </div>
  );
}

export default MatchItem;