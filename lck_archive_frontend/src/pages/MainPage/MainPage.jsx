import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../common/Component/Header/Header';
import './MainPage.scss';
import Content from '../../common/Component/Content/Content';

function MainPage(props) {
  return (
    <div className="MainPage">
      <Header />
      <Content>
        <div className='titleWrapper'>
          <h1 className='title'>LCK ARCHIVE</h1>
          <p className='subtitle'>"LCK Archive" 프로젝트는 사용자들이 효율적으로 LCK에 관한 정보를 얻을 수 있는 편리한 웹 애플리케이션을 제공하여 LCK의 팬들이 선수들의 활동을 관심과 응원으로 이어나갈 수 있도록 도움을 주고자 합니다.</p>
        </div>
        <div className='contentWrapper'>
          <Link to='/player' className='box'>
            <div className='boxTitle'>Player</div>
            <div className='boxDescription'>LCK에 참여하는 플레이어들의 프로필과 경기 기록을 확인해보세요.</div>
          </Link>
          <Link to='/team' className='box'>
          <div className='boxTitle'>Team</div>
            <div className='boxDescription'>LCK에 소속된 팀들의 정보와 선수들의 활약을 알아보세요.</div>
          </Link>
          <Link to='match' className='box'>
          <div className='boxTitle'>Match</div>
            <div className='boxDescription'>LCK 경기 일정과 결과를 확인하고, 앞으로 예정된 경기를 놓치지 마세요.</div>
          </Link>
        </div>
      </Content>
    </div>
  );
}

export default MainPage;
