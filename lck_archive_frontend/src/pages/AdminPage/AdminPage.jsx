import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../common/Component/Header/Header';
import TeamModal from './TeamModal';
import MatchModal2 from './MatchModal';
import './AdminPage.scss';
import Content from '../../common/Component/Content/Content';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { getCookie } from '../../common/cookie';

function AdminPage(props) {
  const [playerName, setPlayerName] = useState('');
  const [playerNickname, setPlayerNickname] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [playerPosition, setPlayerPosition] = useState('');
  const [teamId, setTeamId] = useState('');
  const [teamList, setTeamList] = useState([]);
  const [playerList, setPlayerList] = useState([]);

  const [isPlayerModalOpen, setPlayerModalOpen] = useState(false);
  const [showPlayerUpdateModal, setShowPlayerUpdateModal] = useState(false);
  const [showPlayerDeleteModal, setShowPlayerDeleteModal] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [showTeamUpdateModal, setShowTeamUpdateModal] = useState(false);
  const [showTeamDeleteModal, setShowTeamDeleteModal] = useState(false);
  const [MatchModal, ShowMatchModal] = useState(false);
  const [MatchUpdateModal, ShowMatchUpdateModal] = useState(false);
  const [MatchDeleteModal, ShowMatchDeleteModal] = useState(false);

  const [playerId, setPlayerId] = useState('');

  useEffect(() => {
    fetchTeamList();
    fetchPlayerList();
  }, []);

  const fetchTeamList = async () => {
    try {
      const response = await axios.get("http://localhost:3010/team/");
      setTeamList(response.data);
    } catch (error) {
      console.log("Error fetching team list:", error);
    }
  };
  const fetchPlayerList = async () => {
    try {
      const response = await axios.get("http://localhost:3010/player/");
      setPlayerList(response.data);
    } catch (error) {
      console.log("Error fetching player list:", error);
    }
  };


  const handlePlayerModalOpen = () => {
    setPlayerModalOpen(true);
  };
  const handleOpenPlayerUpdateModal = () => {
    setShowPlayerUpdateModal(true);
  };
  const handleOpenPlayerDeleteModal = () => {
    setShowPlayerDeleteModal(true);
  };
  const handleOpenTeamModal = () => {
    setShowTeamModal(true);
  }
  const handleOpenTeamUpdateModal = () => {
    setShowTeamUpdateModal(true);
  }
  const handleOpenTeamDeleteModal = () => {
    setShowTeamDeleteModal(true);
  }
  // MatchModal Handler
  const handleOpenMatchModal = () => {
    ShowMatchModal(true);
  }
  const handleOpenMatchUpdateModal = () => {
    ShowMatchUpdateModal(true);
  }
  const handleOpenMatchDeleteModal = () => {
    ShowMatchDeleteModal(true);
  }


  const handleCloseModal = () => {
    setPlayerName('');
    setPlayerNickname('');
    setSelectedFile('');
    setPlayerPosition('');
    setTeamId('');
    setPlayerModalOpen(false);
    setShowPlayerUpdateModal(false);
    setShowPlayerDeleteModal(false);
    setShowTeamModal(false);
    setShowTeamUpdateModal(false);
    setShowTeamDeleteModal(false);
    ShowMatchModal(false);
    ShowMatchUpdateModal(false);
    ShowMatchDeleteModal(false);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handlePlayerAdd = async () => {
    try {
      const file = new File([selectedFile], `${playerNickname}.png`, {
        type: selectedFile.type,
      });
      const formData = new FormData();
      formData.append("image", file);

      const token = getCookie("access_token"); // Assuming getCookie function is available

      await axios.post("http://localhost:3010/image/player/insert/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const playerData = {
        player_name: playerName,
        player_nickname: playerNickname,
        player_img: `${playerNickname}.png`,
        player_position: playerPosition,
        team_id: teamId,
      };
      const response = await axios.post(
        "http://localhost:3010/player/insert",
        playerData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Reset the input fields
      handleCloseModal()
    } catch (error) {
      console.log('Error adding player:', error);
    }


  };
  const handlePlayerUpdate = async () => {
    try {
      const file = new File([selectedFile], `${playerNickname}.png`, {
        type: selectedFile.type,
      });
      const formData = new FormData();
      formData.append("image", file);

      const token = getCookie("access_token"); // Assuming getCookie function is available

      await axios.post("http://localhost:3010/image/player/insert/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const playerData = {
        player_name: playerName,
        player_nickname: playerNickname,
        player_img: `${playerNickname}.png`,
        player_position: playerPosition,
        team_id: teamId,
      };
      const response = await axios.put(
        `http://localhost:3010/player/update/${playerId}`,
        playerData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Reset the input fields
      handleCloseModal()
    } catch (error) {
      console.log('Error editing player:', error);
    }


  };
  const handlePlayerDelete = async () => {
    try {
      const token = getCookie("access_token");
      const response = await axios.delete(
        `http://localhost:3010/player/delete/${playerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log("Error Deleting player", error)
    }
    handleCloseModal()
  }
  const token = getCookie("access_token")
  return (
    <div className="AdminPage">
      {token && (<div>
        <Header />
        <Content>
          <div className='titleWrapper'>
            <h1 className='title'>LCK ARCHIVE 관리자 페이지</h1>
          </div>
          <div className='contentWrapper'>
            <button className='box' onClick={handlePlayerModalOpen}>
              <div className='boxTitle'>Player 추가</div>
              <div className='boxDescription'>LCK에 참여하는 플레이어들의 프로필을 추가</div>
            </button>
            <button className='box' onClick={handleOpenTeamModal}>
              <div className='boxTitle'>Team 추가</div>
              <div className='boxDescription'>LCK에 소속된 팀정보 추가</div>
            </button>
            <button className='box' onClick={handleOpenMatchModal}>
              <div className='boxTitle'>Match 추가</div>
              <div className='boxDescription'>LCK 경기 일정 추가</div>
            </button>
          </div>
          <div className='contentWrapper'>
            <button className='box' onClick={handleOpenPlayerUpdateModal}>
              <div className='boxTitle'>Player 수정</div>
              <div className='boxDescription'>LCK에 참여하는 플레이어들의 프로필을 수정</div>
            </button>
            <button className='box' onClick={handleOpenTeamUpdateModal}>
              <div className='boxTitle'>Team 수정</div>
              <div className='boxDescription'>LCK에 소속된 팀정보 수정</div>
            </button>
            <button className='box' onClick={handleOpenMatchUpdateModal}>
              <div className='boxTitle'>Match 수정</div>
              <div className='boxDescription'>LCK 경기 일정 수정</div>
            </button>
          </div>
          <div className='contentWrapper'>
            <button className='box' onClick={handleOpenPlayerDeleteModal}>
              <div className='boxTitle'>Player 삭제 </div>
              <div className='boxDescription'>LCK에 참여하는 플레이어들의 프로필을 삭제</div>
            </button>
            <button className='box' onClick={handleOpenTeamDeleteModal}>
              <div className='boxTitle'>Team 삭제</div>
              <div className='boxDescription'>LCK에 소속된 팀정보 삭제</div>
            </button>
            <button className='box' onClick={handleOpenMatchDeleteModal}>
              <div className='boxTitle'>Match 삭제</div>
              <div className='boxDescription'>LCK 경기 일정 삭제</div>
            </button>
          </div>
        </Content>

        {isPlayerModalOpen && (
          <div className="modal">
            <div className="modalContent">
              <div className='modaltitle'>
                <h2>Player 추가</h2>
                <span className="closeButton" onClick={handleCloseModal}>
                  <CloseIcon />
                </span>
              </div>
              <input
                type="text"
                placeholder="이름을 입력해주세요"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
              />
              <input
                type="text"
                placeholder="선수의 닉네임을 적어주세요"
                value={playerNickname}
                onChange={(e) => setPlayerNickname(e.target.value)}
              />

              <select
                value={playerPosition}
                onChange={(e) => setPlayerPosition(e.target.value)}
              >
                <option value="">플레이어 포지션 선택</option>
                <option value="TOP">TOP</option>
                <option value="JUG">JUG</option>
                <option value="MID">MID</option>
                <option value="AD">AD</option>
                <option value="SUP">SUP</option>
              </select>
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
                type="file"
                className='fileInput'
                onChange={handleFileChange} />
              <button onClick={handlePlayerAdd}>추가하기</button>
            </div>
          </div>
        )}
        {showPlayerUpdateModal && (
          <div className="modal">
            <div className="modalContent">
              <div className='modaltitle'>
                <h2>Player 수정</h2>
                <span className="closeButton" onClick={handleCloseModal}>
                  <CloseIcon />
                </span>
              </div>
              <select
                value={playerId} // Changed to teamId
                onChange={(e) => setPlayerId(e.target.value)} // Changed to setTeamId
              >
                <option value="">수정할 선수 선택</option>
                {playerList.map((player) => (
                  <option key={player.player_id} value={player.player_id}> {/* Changed to team_id */}
                    {player.player_nickname}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="이름을 입력해주세요"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
              />
              <input
                type="text"
                placeholder="수정할 선수의 닉네임을 적어주세요"
                value={playerNickname}
                onChange={(e) => setPlayerNickname(e.target.value)}
              />

              <select
                value={playerPosition}
                onChange={(e) => setPlayerPosition(e.target.value)}
              >
                <option value="">플레이어 포지션 선택</option>
                <option value="탑">TOP</option>
                <option value="정글">JUG</option>
                <option value="미드">MID</option>
                <option value="원딜">AD</option>
                <option value="서포터">SUP</option>
              </select>
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
                type="file"
                className='fileInput'
                onChange={handleFileChange} />
              <button onClick={handlePlayerUpdate}>수정하기</button>
            </div>
          </div>
        )}

        {showPlayerDeleteModal && (
          <div className="modal">
            <div className="modalContent">
              <div className='modaltitle'>
                <h2>Player 삭제</h2>
                <span className="closeButton" onClick={handleCloseModal}>
                  <CloseIcon />
                </span>
              </div>
              <select
                value={playerId} // Changed to teamId
                onChange={(e) => setPlayerId(e.target.value)} // Changed to setTeamId
              >
                <option value="">삭제할 선수 선택</option>
                {playerList.map((player) => (
                  <option key={player.player_id} value={player.player_id}> {/* Changed to team_id */}
                    {player.player_nickname}
                  </option>
                ))}
              </select>
              <button onClick={handlePlayerDelete}>삭제하기</button>
            </div>
          </div>
        )}

        {showTeamModal && (
          <TeamModal doing="Add" onCloseHandler={handleCloseModal} />
        )}
        {showTeamUpdateModal && (
          <TeamModal doing="Update" onCloseHandler={handleCloseModal} />
        )}
        {showTeamDeleteModal && (
          <TeamModal doing="Delete" onCloseHandler={handleCloseModal} />
        )}

        {MatchModal && (
          <MatchModal2 doing="Add" onCloseHandler={handleCloseModal} />
        )}
        {MatchUpdateModal && (
          <MatchModal2 doing="Update" onCloseHandler={handleCloseModal} />
        )}
        {MatchDeleteModal && (
          <MatchModal2 doing="Delete" onCloseHandler={handleCloseModal} />
        )}
      </div>

      )}


    </div>


  );
}

export default AdminPage;
