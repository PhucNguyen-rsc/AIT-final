import { useEffect, useState } from 'react';
import {LoginForm, RegisterForm} from './login.js'
import {ShowCourseForm, SearchCourseForm} from './Course.js'
import { Routes, Route } from "react-router-dom";
import './App.css';
import Layout from './layout.js'

function App() {
  return (
      <div id="outer" >
      <Layout />
      <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/" element={<LoginForm />} />
          <Route path="/courses" element={<ShowCourseForm />} />
          {/* <Route path="/courses_search" component={<ShowCourseForm />} /> */}
      </Routes>
      </div>
  );
}

export default App;