import {BrowserRouter  as Router, Route, Routes} from 'react-router-dom'

import Main from './pages/MainPage/MainPage';
import './common/common.scss';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
