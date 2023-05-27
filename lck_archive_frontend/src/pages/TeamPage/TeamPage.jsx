import React from 'react';
import Header from '../../common/Component/Header/Header';
import Content from '../../common/Component/Content/Content';
import TeamList from './TeamList';

import './TeamPage.scss';


function TeamPage({props}) {
  return (
    <div className="TeamPage">
      <Header />
      <Content>
        <div className='titleWrapper'>
          <h1 className='title'>LCK Team</h1>
          <p className='subtitle'>LCK 팀은 전 세계적으로 알려진 최고 수준의 기술과 전략을 자랑하는 프로페셔널 팀입니다. <br/>경기 중에 탁월한 플레이와 조율된 팀워크로 주목받으며, 상위권 경쟁력을 유지하고 다양한 챔피언과 플레이 스타일을 구사하는 다재다능한 멀티 플레이어들로 구성되어 LCK 경기에 활력과 열기를 불어넣고 있습니다. <br/>또한 팬들과의 소통을 중요시하며 게임 커뮤니티에 긍정적인 영향을 주는 모범적인 모델로 인정받고 있습니다.</p>
        </div>
        <div className='contentWrapper'>
          <TeamList/>
        </div>
      </Content>
    </div>
  );
}

export default TeamPage;
