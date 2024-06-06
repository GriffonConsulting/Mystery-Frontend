import React from 'react';
import HomePage from './HomePage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Layout';

function App() {
  return (
    <div>
      <header>
      </header>
      <Layout>
      <BrowserRouter>
      <Routes>
          <Route index element={<HomePage />} />
          {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </BrowserRouter>
    </Layout>
    </div>
  );
}

export default App;
