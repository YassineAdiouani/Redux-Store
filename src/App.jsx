import React from 'react';
import Header from './Blocks/Header-Block/Header';
import Market from "./Blocks/Market-Block/Market";
import { Route, Routes } from 'react-router-dom';
import "./Style.css";
import Cart from './Blocks/Cart-Block/Cart';
import Setting from './Blocks/Setting-Block/Setting';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Market />} />
        <Route path='/Cart'  element={<Cart />} />
        <Route path="/Setting" element={<Setting />} />
      </Routes>
    </>
  )
}

export default App
