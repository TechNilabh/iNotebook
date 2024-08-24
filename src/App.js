import './App.css';
import NoteState from './context/NoteState';
import {
  BrowserRouter as Router,
  Routes,  // Replace Switch with Routes
  Route,
  Link
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import SignUp from './components/SignUp';

function App() {
  return (
    <>
    <NoteState>

      <Router>
        <Navbar />
        <div className="container">

        <Routes>  
          <Route exact path="/" element={<Home />} />  
          <Route exact path="/about" element={<About />} />  
          <Route exact path="/login" element={<Login />} />  
          <Route exact path="/signup" element={<SignUp  />} />  
        </Routes>
        </div>
      </Router>
    </NoteState>
    </>
  );
}

export default App;

