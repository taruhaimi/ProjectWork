import './App.css';
import Home from './components/Home'
import NotFound from './components/NotFound'
import Header from './components/Header'
import Footer from './components/Footer'
import Register from './components/Register'
import Login from './components/Login'
import Logout from './components/Logout'
import Tutorials from './components/Tutorials'
import MyPosts from './components/MyPosts';
import {useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'


function App() {

  const [token, setToken] = useState(() => {
    const tokenString = localStorage.getItem("auth_token");
    return tokenString? tokenString : {}
  });
  const [user, setUser] = useState(() => {
    console.log(token);
    if(Object.keys(token).length === 0) {
      return {}
    } else {
      const userString = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString())
      return userString? userString : {}
    }
  });


  
  return (
    <Router> 
      <div className="App">
        <Header />
        <Routes>
          <Route path='*' element={<NotFound />} />
          <Route path="/" element={<Home />}/>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setUser={setUser} setToken={setToken}/>} />
          <Route path="/logout" element={<Logout setToken={setToken}/>} />
          <Route path="/tutorials" element={<Tutorials />} />
          <Route path="/myposts" element={<MyPosts id={user.id} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
