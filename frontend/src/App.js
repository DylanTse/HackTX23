import React, { useEffect, useState} from 'react';
import './App.css';
import HomeScreen from "./components/HomeScreen.js";
import Review from './components/Review.js';
import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route} from "react-router-dom";


export default function App() {
    
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<HomeScreen />} >
                    <Route path="review" element={<Review />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

