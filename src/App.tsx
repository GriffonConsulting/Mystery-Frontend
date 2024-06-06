import React from 'react';
import HomePage from './HomePage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Layout';
import SignIn from './Pages/Authenticate/SignIn';
import SignUp from './Pages/Authenticate/SignUp';

function App() {
  return (
    <div>
      <header>
      </header>
      <Layout>
      <BrowserRouter>
      <Routes>
          <Route index element={<HomePage />} />
          <Route path="/authenticate/signin" element={<SignIn />} />
          <Route path="/authenticate/signup" index element={<SignUp />} />
          {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </BrowserRouter>
    </Layout>
    </div>
  );
}

export default App;
