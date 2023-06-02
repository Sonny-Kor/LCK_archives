import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MatchItem from './MatchItem';
import './MatchList.scss';

function MatchList(props) {
  const [MatchListData, setMatchList] = useState([]);

  const fetchMatchList = async () => {
    const response = await axios.get("http://localhost:3010/Match/");
    setMatchList(response.data);
  }

  useEffect(() => {
    fetchMatchList();
    
  }, []);



  return (
    <ul className="MatchList">
      {MatchListData.map((Match, index) => (
        <MatchItem
          key={Match.Match_id}
          match_data={Match.match_data}
          team1_name={Match.team1_name}
          team1_logo={Match.team1_logo}
          team1_score={Match.team1_score}
          team2_name={Match.team2_name}
          team2_logo={Match.team2_logo}
          team2_score={Match.team2_score}
          youtube_link={Match.youtube_link}
        />
      ))}
    </ul>
  );
}

export default MatchList;