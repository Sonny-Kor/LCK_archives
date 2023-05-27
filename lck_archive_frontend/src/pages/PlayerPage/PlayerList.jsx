import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PlayerItem from './PlayerItem';
import './PlayerList.scss';

function PlayerList(props) {
  const [playerList, setPlayerList] = useState([]);

  const fetchPlayerList = async () => {
    const response = await axios.get("http://localhost:3010/player/");
    setPlayerList(response.data);
  }

  useEffect(() => {
    fetchPlayerList();
  }, []);

  return (
    <ul className="PlayerList">
      {playerList.map((player, index) => (
        <PlayerItem
          key={player.player_id}
          player_name={player.player_name}
          player_nickname={player.player_nickname}
          player_img={player.player_img}
          player_position={player.player_position}
          team_name={player.team_name}
        />
      ))}
    </ul>
  );
}

export default PlayerList;