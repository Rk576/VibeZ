import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateAcc from './components/Auth/CreateAcc';
import Landing from './components/Main/Landing';
import LogIn from './components/Auth/LogIn';
import VerifyMobile from './components/Auth/VerifyMobile';
import Explore from './components/Main/Explore';
import EventDetails from './components/Main/EventDetails';
import AddEventForm from './components/Main/AddEventForm';
import Admin from './components/Auth/Admin';

function App() {
  return (
    <Router>
    <div>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/login" element={<LogIn/>}/>
        <Route path="/signup" element={<CreateAcc/>}/>
        <Route path="/VerifyMobile" element={<VerifyMobile/>}/>
        <Route path="/explore" element={< Explore/>} />
        <Route path="/event/:id" element={<EventDetails/>}/>
        <Route path="/eventform" element={< AddEventForm/>} />
        <Route path="/admin" element={<Admin/>}/>

      </Routes>
    </div>
    </Router>
  );
}

export default App;
