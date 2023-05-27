import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TeamItem from './TeamItem';
import './TeamList.scss';

function TeamList(props) {
  const [TeamList, setTeamList] = useState([]);

  const fetchTeamList = async () => {
    const response = await axios.get("http://localhost:3010/team/");
    setTeamList(response.data);
  }

  useEffect(() => {
    fetchTeamList();
  }, []);

  return (
    <ul className="TeamList">
      {TeamList.map((team, index) => (
        <TeamItem
          key={team.team_id}
          team_name={team.team_name}
          team_logo={team.team_logo}
        />
      ))}
    </ul>
  );
}

export default TeamList;