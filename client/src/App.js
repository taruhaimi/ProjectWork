import './App.css';
import Home from './components/Home'
import NotFound from './components/NotFound'
import Header from './components/Header'
import Footer from './components/Footer'
import Register from './components/Register'
import Login from './components/Login'
import Logout from './components/Logout'
import Tutorials from './components/Tutorials'
import {useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'


function App() {
  const [jwt, setJwt] = useState("");
  const [user, setUser] = useState({})


  
  return (
    <Router> 
      <div className="App">
        <Header jwt={jwt} />
        <Routes>
          <Route path='*' element={<NotFound />} />
          <Route path="/" element={<> <h2>{jwt ? `Welcome ${user.email}!` : ""} </h2> <Home jwt={jwt}/> </>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setJwt={setJwt} setUser={setUser} jwt={jwt}/>} />
          <Route path="/logout" element={<Logout jwt={jwt}/>} />
          <Route path="/tutorials" element={<Tutorials />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
