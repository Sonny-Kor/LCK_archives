import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../../common/Component/Header/Header';
import Content from '../../common/Component/Content/Content';
import PlayerList from './PlayerList';

import './PlayerPage.scss';


function PlayerPage({props}) {
  return (
    <div className="PlayerPage">
      <Header />
      <Content>
        <div className='titleWrapper'>
          <h1 className='title'>LCK PLAYER</h1>
          <p className='subtitle'>LCK에 참가하는 프로게이머들은 전 세계적으로 인정받는 최고 수준의 기술과 전략을 자랑하는 엘리트 선수들로, 게임 내에서의 탁월한 플레이와 경기 중에 보여주는 집중력과 조율된 팀워크로 주목받고 있습니다.<br></br> 이들은 매 순간 경기에서 최선을 다하며 강한 경쟁력을 통해 상위권에 오르고, 다양한 챔피언과 플레이 스타일을 구사하는 다재다능한 멀티 플레이어로서 LCK의 경기에 활력과 열기를 불어넣고 있습니다. <br></br>또한 팬들과의 소통을 중요시하며, 그들의 행동과 언행으로 게임 커뮤니티에 긍정적인 영향을 주는 모범적인 모델로 인정받고 있습니다.</p>
        </div>
        <div className='contentWrapper'>
          <PlayerList/>
        </div>
      </Content>
    </div>
  );
}

export default PlayerPage;
