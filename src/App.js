
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navber from './compo/Navber';
import { useState } from 'react';
import Home from './compo/Home';
import About from './compo/About';
import Contact from './compo/Contact';
import NoteState from './context/notes/NoteState';
import Alert from './compo/Alert.js';
import Login from './compo/Login';
import Signup from './compo/Signup';

const App = () => {
  
  return (
    <NoteState>
      <Router>
        <Navber />
        <Alert  />
        <Routes>
          <Route path="/" element={<Home  />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          
          <Route path="/login" element={  <Login />} />
          <Route path="/signup"element={  <Signup />} />
        
        </Routes>
      </Router>
     </NoteState>
  );
};

export default App;
