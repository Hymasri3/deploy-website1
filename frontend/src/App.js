import './App.css';
import {Routes,Route, Navigate} from 'react-router-dom'
import Home from './Components/Home'
import Login from './Components/Login'
import Signup from './Components/Signup'
import { useState } from 'react';
import RefreshHandler from './RefreshHandler';

function App() {

  const[isAuthenticated,setIsAuthenticated]=useState(false);

  const PrivateRoute=({element})=>{
      return isAuthenticated?element:<Navigate to='/login'/>
  }

  return (
    <div className="App">
      <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
      <Routes>
          <Route path="/" element={<Navigate to='/login'/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/home" element={<PrivateRoute element={<Home/>}/>}/>
      </Routes>
    </div>
  );
}

export default App;
