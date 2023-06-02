import {BrowserRouter  as Router, Route, Routes} from 'react-router-dom'

import TeamPage from './pages/TeamPage/TeamPage';
import PlayerPage from './pages/PlayerPage/PlayerPage';
import MatchPage from './pages/MatchPage/MatchPage';
import Main from './pages/MainPage/MainPage';
import LoginPage from './pages/LoginPage/LoginPage';
import './common/common.scss';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/player" element={<PlayerPage />} />
          <Route path="/match" element={<MatchPage />} />
          <Route path="/login" element={<LoginPage/>}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
