import { Routes,Router, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import TopSection from './components/TopSection';
import Category from './components/Category';
import AboutUs from './components/AboutUs';

function App(){
  return (
    <div>
      <Navbar />
      <TopSection />
      <Category/>
      <AboutUs/>
    </div>
  );
}


export default App;
