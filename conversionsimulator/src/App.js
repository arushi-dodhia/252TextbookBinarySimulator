import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Converter from './Converter';
import ConversionScreen from './ConversionScreen.jsx';


export default function App() {
  return (
    <div className="w-full min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Number Converter</h1>
        <Routes>
          <Route path="/" element={<Converter />} />
          <Route path="/conversion/:type" element={<ConversionScreen />} />
          <Route path="*" element={<Navigate to="/" />} /> 
        </Routes>
      </div>
    </div>
  );
}