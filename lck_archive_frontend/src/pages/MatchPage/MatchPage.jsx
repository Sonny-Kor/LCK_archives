import React from 'react';
import Header from '../../common/Component/Header/Header';
import Content from '../../common/Component/Content/Content';
import MatchList from './MatchList';

import './MatchPage.scss';


function MatchPage({props}) {
  return (
    <div className="MatchPage">
      <Header />
      <Content>
        <div className='titleWrapper'>
          <h1 className='title'>LCK Match</h1>
          <p className='subtitle'>LCK 경기는 전 세계적으로 주목받는 대규모 프로페셔널 리그 경쟁으로, 최고 수준의 기술과 전략이 펼쳐집니다. 경기 중에는 각 팀의 탁월한 플레이와 조율된 팀워크가 선보이며, 열띤 경쟁을 통해 상위권에 오르기 위한 치열한 경쟁을 펼치고 있습니다. 다양한 챔피언과 플레이 스타일을 구사하는 선수들의 다재다능함은 경기에 활력과 열기를 불어넣고 있습니다. 또한 팬들과의 소통과 함께 게임 커뮤니티에 긍정적인 영향을 주는 모범적인 리그로서도 인정받고 있습니다.</p>
        </div>
        <div className='contentWrapper'>
          <MatchList/>
        </div>
      </Content>
    </div>
  );
}

export default MatchPage;
