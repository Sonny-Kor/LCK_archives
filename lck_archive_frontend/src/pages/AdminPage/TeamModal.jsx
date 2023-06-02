import React, { useEffect, useState } from "react";
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';

import { getCookie } from "../../common/cookie";

import './TeamModal.scss'
function TeamModal({
  doing,
  onCloseHandler
}) {

  const [teamList, setTeamList] = useState([]);
  const [teamId, setTeamId] = useState('');
  const [teamName, setTeamName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchTeamList();
  }, []);

  const fetchTeamList = async () => {
    try {
      const response = await axios.get("http://localhost:3010/team/");
      setTeamList(response.data);
    } catch (error) {
      console.log("Error fetching team list:", error);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleTeamAdd = async () => {
    try {
      const file = new File([selectedFile], `${teamName}_logo.png`, {
        type: selectedFile.type,
      });
      const formData = new FormData();
      formData.append("image", file);

      const token = getCookie("access_token");

      await axios.post("http://localhost:3010/image/team/insert/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const TeamData = {
        team_name: teamName,
        team_logo: `${teamName}_logo.png`
      }
      const response = await axios.post(
        "http://localhost:3010/team/insert",
        TeamData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      onCloseHandler();
    } catch (error) {
      console.log("Error adding Team", error);
    }
  }
  const handleTeamUpdate = async () => {
    try {
      const file = new File([selectedFile], `${teamName}_logo.png`, {
        type: selectedFile.type,
      });
      const formData = new FormData();
      formData.append("image", file);

      const token = getCookie("access_token");

      await axios.post(`http://localhost:3010/image/team/insert/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const TeamData = {
        new_team_name: teamName,
        team_logo: `${teamName}_logo.png`
      }
      const response = await axios.put(
        `http://localhost:3010/team/update/${teamId}/`,
        TeamData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      onCloseHandler();
    } catch (error) {
      console.log("Error adding Team", error);
    }
  }
  const handleTeamDelete = async () => {
    try{
      const token = getCookie("access_token");
      const response = await axios.delete(
        `http://localhost:3010/team/delete/${teamId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      onCloseHandler();
   }catch(error){
    console.log("Error Deleting player",error)
   }
  }

  return (
    <div className="TeamModal">
      {doing === "Add" && (
        <div className="modal">
          <div className="modalContent">
            <div className='modaltitle'>
              <h2>Team 추가</h2>
              <span className="closeButton" onClick={onCloseHandler}>
                <CloseIcon />
              </span>
            </div>

            <input
              type="text"
              placeholder="이름을 입력해주세요"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
            <input
              type="file"
              className='fileInput'
              onChange={handleFileChange} />
            <button onClick={handleTeamAdd}>추가하기</button>
          </div>
        </div>
      )}

      {doing === "Update" && (
        <div className="modal">
          <div className="modalContent">
            <div className='modaltitle'>
              <h2>Team 수정</h2>
              <span className="closeButton" onClick={onCloseHandler}>
                <CloseIcon />
              </span>
            </div>
            <select
              value={teamId} // Changed to teamId
              onChange={(e) => setTeamId(e.target.value)} // Changed to setTeamId
            >
              <option value="">팀 선택</option>
              {teamList.map((team) => (
                <option key={team.team_id} value={team.team_id}> {/* Changed to team_id */}
                  {team.team_name}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="이름을 입력해주세요"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
            <input
              type="file"
              className='fileInput'
              onChange={handleFileChange} />
            <button onClick={handleTeamUpdate}>수정하기</button>
          </div>
        </div>
      )}

      {doing === "Delete" && (
        <div className="modal">
          <div className="modalContent">
            <div className='modaltitle'>
              <h2>Team 삭제</h2>
              <span className="closeButton" onClick={onCloseHandler}>
                <CloseIcon />
              </span>
            </div>
            <select
              value={teamId} // Changed to teamId
              onChange={(e) => setTeamId(e.target.value)} // Changed to setTeamId
            >
              <option value="">팀 선택</option>
              {teamList.map((team) => (
                <option key={team.team_id} value={team.team_id}> {/* Changed to team_id */}
                  {team.team_name}
                </option>
              ))}
            </select>
            <button onClick={handleTeamDelete}>삭제하기</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeamModal;