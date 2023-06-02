import React, { useEffect, useState } from "react";
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';

import { getCookie } from "../../common/cookie";

import './MatchModal.scss'
function MatchModal({
  doing,
  onCloseHandler
}) {

  const [teamList, setTeamList] = useState([]);
  const [matchList, setMatchList] = useState([]);
  const [matchId, setMatchId] = useState('');
  const [teamId, setTeamId] = useState('');
  const [teamId2, setTeamId2] = useState('');
  const [teamName, setTeamName] = useState('');
  const [team1_score, setTeam1_Score] = useState('');
  const [team2_score, setTeam2_Score] = useState('');
  const [matchdate, setMatchdate] = useState('');
  const [youtubeLink, setYoutubeLink] = useState('');
  useEffect(() => {
    fetchTeamList();
    fetchMatchList();
  }, []);
  const formattedDate = (match_data) => {
    return match_data ? match_data.substring(0, 10) : '';
  }
  const formattedDate2 = (dateString) => {
    return `${dateString.substr(0, 4)}-${dateString.substr(4, 2)}-${dateString.substr(6, 2)}`;
  }
  const fetchTeamList = async () => {
    try {
      const response = await axios.get("http://localhost:3010/team/");
      setTeamList(response.data);
    } catch (error) {
      console.log("Error fetching team list:", error);
    }
  };
  const fetchMatchList = async () => {
    try {
      const response = await axios.get("http://localhost:3010/match/");
      setMatchList(response.data);
    } catch (error) {
      console.log("Error fetching team list:", error);
    }
  };


  const handleMatchAdd = async () => {
    // console.log(teamId, teamId2, team1_score, team2_score, matchdate)
    try {
      const token = getCookie("access_token");

      const MatchData = {
        match_date: formattedDate2(matchdate),
        team1_id: parseInt(teamId),
        team1_score: parseInt(team1_score),
        team2_id: parseInt(teamId2),
        team2_score: parseInt(team2_score),
        youtube_link: youtubeLink
      }
      const response = await axios.post(
        `http://localhost:3010/match/insert/`,
        MatchData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      onCloseHandler();
    } catch (error) {
      console.log("Error adding match", error);
    }
  }
  const handleMatchUpdate = async () => {
    try {
      const token = getCookie("access_token");

      const MatchData = {
        match_date: formattedDate2(matchdate),
        team1_id: parseInt(teamId),
        team1_score: parseInt(team1_score),
        team2_id: parseInt(teamId2),
        team2_score: parseInt(team2_score),
        youtube_link: youtubeLink
      }
      const response = await axios.put(
        `http://localhost:3010/match/update/${matchId}`,
        MatchData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      onCloseHandler();
    } catch (error) {
      console.log("Error adding match", error);
    }
  }
  const handleMatchDelete = async () => {
    try {
      const token = getCookie("access_token");
      const response = await axios.delete(
        `http://localhost:3010/match/delete/${matchId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      onCloseHandler();
    } catch (error) {
      console.log("Error Deleting player", error)
    }
  }

  return (
    <div className="MatchModal">
      {doing === "Add" && (
        <div className="modal">
          <div className="modalContent">
            <div className='modaltitle'>
              <h2>Match 추가</h2>
              <span className="closeButton" onClick={onCloseHandler}>
                <CloseIcon />
              </span>
            </div>
            <select
              value={teamId} // Changed to teamId
              onChange={(e) => setTeamId(e.target.value)} // Changed to setTeamId
            >
              <option value="">Team 선택</option>
              {teamList.map((team) => (
                <option key={team.team_id} value={team.team_id}> {/* Changed to team_id */}
                  {team.team_name}
                </option>
              ))}
            </select>
            <select
              value={teamId2} // Changed to teamId
              onChange={(e) => setTeamId2(e.target.value)} // Changed to setTeamId
            >
              <option value="">Team 선택</option>
              {teamList.map((team) => (
                <option key={team.team_id} value={team.team_id}> {/* Changed to team_id */}
                  {team.team_name}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="틈1의 점수를 입력해주세요(2:1인 경우 2)"
              value={team1_score}
              onChange={(e) => setTeam1_Score(e.target.value)}
            />
            <input
              type="text"
              placeholder="팀2의 점수를 입력해주세요(2:1인 경우 1)"
              value={team2_score}
              onChange={(e) => setTeam2_Score(e.target.value)}
            />
            <input
              type="text"
              placeholder="날짜를 입력해주세요(YYYY/MM/DD)"
              value={matchdate}
              onChange={(e) => setMatchdate(e.target.value)}
            />
            <input
              type="text"
              placeholder="YoutubeLink"
              value={youtubeLink}
              onChange={(e) => setYoutubeLink(e.target.value)}
            />
            <button onClick={handleMatchAdd}>추가하기</button>
          </div>
        </div>
      )}

      {doing === "Update" && (
        <div className="modal">
          <div className="modalContent">
            <div className='modaltitle'>
              <h2>Match 추가</h2>
              <span className="closeButton" onClick={onCloseHandler}>
                <CloseIcon />
              </span>
            </div>
            <select
              value={matchId} // Changed to teamId
              onChange={(e) => setMatchId(e.target.value)} // Changed to setTeamId
            >
              <option value="">Match 선택</option>
              {matchList.map((match) => (
                <option key={match.match_id} value={match.match_id}> {/* Changed to team_id */}
                  {formattedDate(match.match_data)} - {match.team1_name} vs {match.team2_name}
                </option>
              ))}
            </select>
            <select
              value={teamId} // Changed to teamId
              onChange={(e) => setTeamId(e.target.value)} // Changed to setTeamId
            >
              <option value="">Team 선택</option>
              {teamList.map((team) => (
                <option key={team.team_id} value={team.team_id}> {/* Changed to team_id */}
                  {team.team_name}
                </option>
              ))}
            </select>
            <select
              value={teamId2} // Changed to teamId
              onChange={(e) => setTeamId2(e.target.value)} // Changed to setTeamId
            >
              <option value="">Team 선택</option>
              {teamList.map((team) => (
                <option key={team.team_id} value={team.team_id}> {/* Changed to team_id */}
                  {team.team_name}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="틈1의 점수를 입력해주세요(2:1인 경우 2)"
              value={team1_score}
              onChange={(e) => setTeam1_Score(e.target.value)}
            />
            <input
              type="text"
              placeholder="팀2의 점수를 입력해주세요(2:1인 경우 1)"
              value={team2_score}
              onChange={(e) => setTeam2_Score(e.target.value)}
            />
            <input
              type="text"
              placeholder="날짜를 입력해주세요(YYYY/MM/DD)"
              value={matchdate}
              onChange={(e) => setMatchdate(e.target.value)}
            />
            <input
              type="text"
              placeholder="YoutubeLink"
              value={youtubeLink}
              onChange={(e) => setYoutubeLink(e.target.value)}
            />
            <button onClick={handleMatchAdd}>추가하기</button>
          </div>
        </div>
      )}

      {doing === "Delete" && (
        <div className="modal">
          <div className="modalContent">
            <div className='modaltitle'>
              <h2>Match 삭제</h2>
              <span className="closeButton" onClick={onCloseHandler}>
                <CloseIcon />
              </span>
            </div>
            <select
              value={matchId} // Changed to teamId
              onChange={(e) => setMatchId(e.target.value)} // Changed to setTeamId
            >
              <option value="">Match 선택</option>
              {matchList.map((match) => (
                <option key={match.match_id} value={match.match_id}> {/* Changed to team_id */}
                  {formattedDate(match.match_data)} - {match.team1_name} vs {match.team2_name}
                </option>
              ))}
            </select>
            <button onClick={handleMatchDelete}>삭제하기</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MatchModal;