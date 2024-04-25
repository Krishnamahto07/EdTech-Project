import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Pages/Home';
import Navbar from './components/common/Navbar';
import Login from './components/Pages/Login';
import SignupForm from './components/Pages/SignupFoam';
import Logout from './components/Pages/Logout';

// require('dotenv').config();

function App() {
  return (
    <div className='w-screen min-h-screen bg-richblack-900 flex flex-col font-inter'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignupForm/>}/>
        <Route path='/logout' element={<Logout/>}/>
      </Routes>
    </div>
  );
}

export default App;
