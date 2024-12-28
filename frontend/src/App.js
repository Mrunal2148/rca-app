import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import "./App.css";
import RCAForm from "./components/RCAForm";
import RCAList from "./components/RCAList";
import PdfQuestionForm from "./components/PdfQuestionForm";


const App = () => { 
  return (
  <Router> 
    <div className="app"> 
      <Header /> 
      <div className="content"> 
        <div className="sidebar"> 
          <Sidebar /> 
          </div> 
          <div className="main-content"> 
            <Routes>
            <Route path="/" element={<MainContent />} /> 
              <Route path="/RCAForm" element={<RCAForm />} /> 
              <Route path="/RCAList" element={<RCAList />} /> 
              <Route path="pdf-question" element={<PdfQuestionForm />} />
              </Routes> 
            </div> 
        </div> 
        <Footer /> 
      </div> 
  </Router>); };

export default App;
