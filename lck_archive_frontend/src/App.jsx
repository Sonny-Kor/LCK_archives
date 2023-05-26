import {BrowserRouter  as Router, Route, Routes} from 'react-router-dom'

import Main from './pages/TeamPage/TeamPage';
import './common/common.scss';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/team" element={<Main />} />
          <Route path="/player" element={<Main />} />
          <Route path="/match" element={<Main />} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
